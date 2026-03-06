import Image from "next/image";

export function AboutHero() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              Handmade with care, designed for moments that matter
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Every candle we create tells a story of craftsmanship, passion,
              and a commitment to bringing warmth and light into your life.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="absolute -inset-6 -z-10 rounded-3xl bg-secondary/50 blur-0"
              aria-hidden="true"
            />
            <Image
              src="/handmade-gift-set-minimal-purple-yellow.jpg"
              alt="Our handmade candle collection"
              width={1200}
              height={400}
              className="h-auto w-full rounded-xl border object-cover shadow-sm"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
