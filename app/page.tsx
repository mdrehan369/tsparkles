import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
