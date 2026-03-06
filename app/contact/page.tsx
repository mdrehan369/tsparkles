import { Metadata } from "next";
import { ContactFormSection } from "@/components/contact/form-section";
import { ContactFAQ } from "@/components/contact/faq";

export const metadata: Metadata = {
  title: "Contact Us | Handmade Candles & Gifts",
  description:
    "Get in touch with our team. We'd love to hear from you about custom orders, questions, or feedback.",
};

export default function ContactPage() {
  return (
    <>
      <ContactFormSection />
      <ContactFAQ />
    </>
  );
}
