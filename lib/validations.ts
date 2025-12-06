import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 3 characters long")
    .max(100, "Name is too long"),

  email: z
    .string()
    .email("Please enter a valid email Address")
    .toLowerCase()
    .trim(),

  company: z
    .string()
    .max(100, "Company name is too long")
    .optional()
    .or(z.literal("")),

   phone:z
    .string()
    .regex(/^[0-9+\-\s() ]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal('')),

   message: z
    .string()
    .min(5, "Message must be atleast 10 characters long")
    .max(1000, "Message is too long"),

});


export type ContactFormInput = z.infer<typeof contactFormSchema>;