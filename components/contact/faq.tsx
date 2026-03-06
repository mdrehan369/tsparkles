import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What materials are used in your candles?",
    answer:
      "Our candles are hand-poured using a premium blend of natural soy and coconut wax. We use only high-quality fragrance oils and essential oils, with 100% cotton wicks for clean burning.",
  },
  {
    question: "How long do your candles burn?",
    answer:
      "Our standard candles burn for approximately 40-50 hours. Burn time varies depending on the candle size and how you care for it. We recommend trimming the wick to 1/4 inch for optimal performance.",
  },
  {
    question: "Do you offer custom orders?",
    answer:
      "Absolutely! We love creating custom candles for special occasions. Contact us at hello@handmadewith.love with your ideas, and our team will work with you to create something perfect.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in original packaging. If you're not completely satisfied with your purchase, we'll make it right.",
  },
  {
    question: "How do you ship orders?",
    answer:
      "We ship via USPS and UPS with tracking included. Standard shipping takes 5-7 business days, while express options are available. We carefully package every order to ensure safe delivery.",
  },
  {
    question: "Are your products eco-friendly?",
    answer:
      "Yes! We're committed to sustainability. Our candles use natural waxes, our packaging is recyclable and minimalist, and we partner with eco-conscious suppliers.",
  },
];

export function ContactFAQ() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
