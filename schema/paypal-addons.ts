import { z } from "zod";

export const paypalAddonsSchema = z.object({
  subscriptionID: z.string().min(1),
  addonSlugs: z
    .array(z.enum(["targeted-comments", "dm-new-followers"]))
    .min(1)
    .max(2),
  // PayPal subscription ID of the main Grow/Scale plan, from the URL
  parentSubscriptionId: z.string().optional(),
  email: z.string().email().optional(),
  instagramUsername: z.string().optional(),
});

export type PayPalAddonsRequest = z.infer<typeof paypalAddonsSchema>;
