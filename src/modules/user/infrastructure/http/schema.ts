import { z } from "zod";

const password = z
  .string()
  .min(8)
  .max(128)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "must contain uppercase, lowercase, number, and special character",
  );

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/),
  email: z.string().email(),
  password,
  role: z.enum(["admin", "user"]).default("user"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
