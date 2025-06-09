import { z } from "zod/v4";

export const registerUserSchema = z.object({
    name: z.string("Name is required"),
    email: z
        .string("email is required")
        .email({ message: "Invalid email address" }),
    password: z.string("password is required"),
});


export const loginUserSchema = z.object({
    email: z
        .string("email is required")
        .email({ message: "Invalid Email address" }),
    password: z.string("password is required"),
});

export const addBookSchema = z.object({
    name: z.string("Name is required"),
    author: z.string("author name is requried"),
    price: z.number("Price is requried"),
    isbnNo: z.string("ISBN no is required"),
    publish: z.iso.date("publish date is required"), // https://zod.dev/api?id=iso-dates
});