import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  readFlow,
  stageUrl,
  writeFlow,
  type FlowStage,
} from "@/lib/flow/session";

// "Continue without content" / "Continue without add-ons": the only steps
// that can be passed without paying. Each skip only works from its own stage.
const SKIPS: Record<string, { from: FlowStage; to: FlowStage }> = {
  upsell: { from: "paid", to: "upsell_done" },
  addons: { from: "upsell_done", to: "addons_done" },
};

const schema = z.object({ step: z.enum(["upsell", "addons"]) });

export const POST = async (req: NextRequest) => {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const flow = await readFlow(req);
  const skip = SKIPS[parsed.data.step];

  if (!flow || flow.stage !== skip.from) {
    return NextResponse.json(
      { message: "You can't skip this step.", next: stageUrl(flow) },
      { status: 409 },
    );
  }

  const state = {
    ...flow,
    stage: skip.to,
    ...(parsed.data.step === "addons" ? { addons: [] } : {}),
  };
  return writeFlow(NextResponse.json({ next: stageUrl(state) }), state);
};
