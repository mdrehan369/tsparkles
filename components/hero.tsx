"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-12 md:py-24">
        <div className="space-y-6">
          <p className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Handmade with love
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Handmade candles and little sparkles, crafted for cozy moments.
          </h1>
          <p className="max-w-prose text-muted-foreground">
            Discover small-batch candles and handcrafted pieces infused with
            natural scents and gentle colors. Thoughtfully made to brighten
            everyday rituals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products">Shop Candles</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/products">All Products</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-6 -z-10 rounded-3xl bg-secondary/50 blur-0"
            aria-hidden="true"
          />
          <Image
            src="/candle.jpg"
            alt="Handmade candles arranged on a minimal surface"
            width={800}
            height={640}
            className="h-auto w-full rounded-2xl border object-cover shadow-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
