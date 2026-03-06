import { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { AboutStory } from "@/components/about/story";
import { AboutTeam } from "@/components/about/team";

export const metadata: Metadata = {
  title: "About Us | Handmade Candles & Gifts",
  description:
    "Learn our story, values, and meet the team behind our handmade candles and artisan gifts.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutTeam />
    </>
  );
}
