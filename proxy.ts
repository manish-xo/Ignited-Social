import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  readFlow,
  stageIndex,
  stageUrl,
  type FlowStage,
} from "@/lib/flow/session";

// Each funnel page is only reachable at exactly its own stage: earlier stages
// can't skip ahead by typing the URL, and later stages can't go back to a
// form they've already submitted. Either way they're sent to where they are.
const FUNNEL_PAGES: Record<string, FlowStage> = {
  "/payment": "signed_up",
  "/upsell/payment/success": "paid",
  "/Addons/payment/addons": "upsell_done",
  "/Addons/payment/complete": "addons_done",
  "/Dashboard-Setup/Setup": "addons_done",
};

// Pages for logged-in customers only (Supabase Auth session).
const isAuthPage = (path: string) =>
  path === "/onboarding" ||
  (path.startsWith("/dashboard") && path !== "/dashboard/login");

const redirectTo = (req: NextRequest, target: string) => {
  const url = new URL(target, req.url);
  // Avoid a redirect loop if we're already there.
  return url.pathname === req.nextUrl.pathname
    ? NextResponse.next()
    : NextResponse.redirect(url);
};

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isLogin = path === "/dashboard/login";

  if (isAuthPage(path) || isLogin) {
    let res = NextResponse.next({ request: req });
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          // Lets Supabase refresh an expiring session on the way through.
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) =>
              req.cookies.set(name, value),
            );
            res = NextResponse.next({ request: req });
            cookiesToSet.forEach(({ name, value, options }) =>
              res.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // The login page stays public; someone already logged in skips the form.
    if (isLogin) {
      return user ? NextResponse.redirect(new URL("/dashboard", req.url)) : res;
    }

    if (!user) {
      // Mid-funnel? Send them to their step; otherwise to the login page.
      const flow = await readFlow(req);
      const midFunnel = flow && flow.stage !== "account_created";
      return NextResponse.redirect(
        new URL(midFunnel ? stageUrl(flow) : "/dashboard/login", req.url),
      );
    }

    // Onboarding is a one-time wizard: finished → no way back in; not
    // finished → it has to be done before the dashboard opens.
    const onboarded = user.app_metadata?.onboarding_completed === true;
    if (path === "/onboarding" && onboarded) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (path !== "/onboarding" && !onboarded) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return res;
  }

  // Old success page from the Stripe version — no longer part of the funnel.
  const required = path === "/payment/success" ? null : FUNNEL_PAGES[path];

  const flow = await readFlow(req);
  if (!flow) return redirectTo(req, "/signup");

  if (!required || stageIndex(flow.stage) !== stageIndex(required)) {
    return redirectTo(req, stageUrl(flow));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/payment",
    "/payment/success",
    "/upsell/payment/success",
    "/Addons/payment/addons",
    "/Addons/payment/complete",
    "/Dashboard-Setup/Setup",
    "/onboarding",
    "/dashboard/:path*",
  ],
};
