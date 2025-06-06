import { z } from "zod/v4"

export const registerUserSchema = z.object({
    name: z.string("name is required"),
    email: z.string("email is required").email({ message: "Invalid email address" }),
    password: z.string("password is required")
})
