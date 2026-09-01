import z from "zod/v3";

export const createPasswordSchema = z.object({
  email: z.string().min(1, "Please enter your email"),
  createPassword: z.string().min(1, "Please enter your password"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

export type SignupFormValues = z.infer<typeof createPasswordSchema>;
