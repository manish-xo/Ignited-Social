# Post-payment upsell page — setup

## What this replaces
Your existing `app/payment/success/page.tsx` (the simple "You're all set"
screen) is replaced by this new version — same route, now shows the
Content Creation upsell instead.

## Files to copy in
- `app/payment/success/page.tsx` — **overwrite** your existing one
- `app/payment/success/UpsellSelector.tsx` — new
- `app/api/upsell/charge/route.ts` — new
- `components/payment/ProfileImpactPanel.tsx` — new
- `lib/upsells.ts` — new

## Two files you need to manually merge (not overwrite)
I renamed these with a `-UPDATED` suffix so I don't clobber changes you
may have made since I last sent them:
- `app/api/create-subscription-UPDATED/route.ts` → replace the contents of
  your real `app/api/create-subscription/route.ts` with this. Only change:
  the response now also returns `customerId`.
- `app/payment/PaymentForm-UPDATED.tsx` → replace the contents of your real
  `app/payment/PaymentForm.tsx` with this. Only change: after payment
  succeeds, it redirects to `/payment/success?plan=...&customer=...&username=...`
  instead of just `?plan=...`.

## Env vars
Add these to `.env.local` (see the refreshed `.env.example`):
- `STRIPE_PRICE_CONTENT_CREATION`, `STRIPE_PRICE_CONTENT_CREATION_PLUS` —
  create these as regular recurring monthly Prices, same as Grow/Scale.
- `STRIPE_COUPON_FIRST_MONTH` — create ONE coupon in Stripe Dashboard:
  Coupons → New → Percent off → 35% → Duration: **Once**. Copy its ID here.
  It's reused for both add-ons since they currently share the same
  first-month discount.

## How the "one tap to add" charge actually works
1. During the main checkout, the card gets attached to the Stripe customer
   and set as `invoice_settings.default_payment_method` — this already
   happens in `create-subscription/route.ts`.
2. On the upsell page, clicking "Add ... — $X today" calls
   `/api/upsell/charge` with just `customerId` + which offer was picked.
3. The route creates a **new subscription** for that add-on, reusing the
   saved default payment method, with `off_session: true` — meaning no
   card form, no Stripe Elements, no re-entering anything.
4. The 35%-off coupon is applied so only the first invoice is discounted;
   from month two it renews at full price automatically.

## Edge case handled
If the customer's bank requires extra authentication for this specific
charge (rare, but happens — usually with EU cards under SCA rules), Stripe
throws `authentication_required`. The route catches that and returns a
clear message asking them to re-enter card details, rather than failing
silently or double-charging.

## Still worth adding before going live
- A webhook for `invoice.payment_failed` on these add-on subscriptions —
  if the saved card later fails to renew, you'll want to know.
- Real photos in `ProfileImpactPanel.tsx` — I used placeholder color tiles
  since I can't generate someone else's before/after content. Swap in a
  real client's before/after grid, or generic stock examples you have
  rights to use, and write your own testimonial (the one I wrote is
  generic filler — replace it with a real one once you have it).
