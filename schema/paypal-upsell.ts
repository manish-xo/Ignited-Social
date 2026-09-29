import { z } from "zod";

export const paypalUpsellSchema = z.object({
  subscriptionID: z.string().min(1),
  offerSlug: z.enum(["content-creation", "content-creation-plus"]),
  // PayPal subscription ID of the main Grow/Scale plan, from the success URL
  parentSubscriptionId: z.string().optional(),
  email: z.string().email().optional(),
  instagramUsername: z.string().optional(),
});

export type PayPalUpsellRequest = z.infer<typeof paypalUpsellSchema>;
