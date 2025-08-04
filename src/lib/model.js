import z from "zod"

//REGISTER SCHEMA
export const registerSchema = z
  .object({
    email: z.email({ message: "Please enter a valid email" }).trim(),
    username: z
      .string()
      .min(1, { message: "Please enter a username" })
      .min(4, { message: "Username must be at least 4 characters" })
      .regex(/[a-zA-Z]/, { message: "Shoud contain at least one letter " })
      .regex(/[0-9]/, { message: "Should contain at least one number " })
      .trim(),
    password: z
      .string()
      .min(1, { message: "Please enter a username" })
      .min(4, { message: "Username must be at least 4 characters" })
      .regex(/[a-zA-Z]/, { message: "Shoud contain at least one letter " })
      .regex(/[0-9]/, { message: "Should contain at least one number " })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

//LOGIN SCHEMA
export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }).trim(),
  password: z.string().min(1, { message: "Please enter your password" }).trim(),
})

//BUCKET SCHEMA
export const bucketSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Come on you should at least do something" })
    .trim(),
})
