import { z } from "zod";

export const paypalSubscriptionSchema = z.object({
  subscriptionID: z.string().min(1),
  plan: z.enum(["grow", "scale"]),
  email: z.string().email(),
  fullName: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  instagramUsername: z.string().optional(),
});

export type PayPalSubscriptionRequest = z.infer<
  typeof paypalSubscriptionSchema
>;
