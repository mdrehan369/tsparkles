export function AboutStory() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Our Story</p>
              <h2 className="text-3xl font-semibold">
                Born from a passion for beauty
              </h2>
            </div>
            <p className="text-muted-foreground">
              What started as a small hobby in our kitchen has blossomed into a
              thriving collection of handmade candles and thoughtful gifts. We
              believe that the best things in life are made slowly, with
              intention and care.
            </p>
            <p className="text-muted-foreground">
              Each of our candles is hand-poured using premium natural waxes,
              infused with carefully selected scent blends that evoke warmth,
              comfort, and cherished memories. We work with small-batch
              production to ensure every piece meets our exacting standards.
            </p>
            <p className="text-muted-foreground">
              Our mission is simple: to create beautiful, meaningful products
              that bring joy and light into everyday moments. From a quiet
              evening at home to a special gift for someone you love, our
              candles are crafted to make those moments unforgettable.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">Our Values</p>
              <h2 className="text-3xl font-semibold">Guiding principles</h2>
            </div>
            <ul className="space-y-4">
              {[
                {
                  title: "Quality First",
                  desc: "Every candle is crafted with premium materials and rigorous quality control.",
                },
                {
                  title: "Sustainability",
                  desc: "We use eco-friendly packaging and natural, responsibly sourced ingredients.",
                },
                {
                  title: "Authenticity",
                  desc: "Our products reflect our genuine passion for artisan craftsmanship.",
                },
                {
                  title: "Community",
                  desc: "We believe in supporting our customers and giving back to our community.",
                },
              ].map((value) => (
                <li key={value.title}>
                  <h3 className="font-medium">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
