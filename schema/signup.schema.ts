import z from "zod/v3";

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Please select your Instagram account from the list"),
  profilePicUrl: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
