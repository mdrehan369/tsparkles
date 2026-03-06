import { z } from "zod";

const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;

export const checkoutSchema = z
  .object({
    // Shipping
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(13, "Phone number is too long")
      .regex(indianPhoneRegex, "Invalid Indian phone number")
      .refine((ph) => Number(ph), "Phone number should not contain letters"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "Stats is required"),
    zipCode: z.string().min(1, "Invalid ZIP code"),
    country: z.string().default("INDIA"),

    // Billing toggle
    sameAsShipping: z.boolean(),

    // Billing
    billingFirstName: z.string().optional(),
    billingLastName: z.string().optional(),
    billingAddress: z.string().optional(),
    billingCity: z.string().optional(),
    billingState: z.string().optional(),
    billingZipCode: z.string().optional(),

    shippingMethod: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.sameAsShipping) {
      const requiredFields = [
        "billingFirstName",
        "billingLastName",
        "billingAddress",
        "billingCity",
        "billingState",
        "billingZipCode",
      ];

      requiredFields.forEach((field) => {
        if (!data[field as keyof typeof data]) {
          ctx.addIssue({
            path: [field],
            code: "custom",
            message: "Required",
          });
        }
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
