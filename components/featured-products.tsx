"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Product = {
  id: string
  name: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: "candle-lavender",
    name: "Lavender Calm Candle",
    price: "$18",
    image: "/lavender-handmade-candle-minimal-product-photo.jpg",
  },
  {
    id: "candle-honey",
    name: "Honey Glow Candle",
    price: "$18",
    image: "/honey-yellow-handmade-candle-minimal-product-photo.jpg",
  },
  {
    id: "gift-mini",
    name: "Mini Sparkles Gift Set",
    price: "$29",
    image: "/handmade-gift-set-minimal-purple-yellow.jpg",
  },
]

export function FeaturedProducts() {
  return (
    <section id="shop" aria-labelledby="featured-title" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 id="featured-title" className="text-2xl font-semibold">
              Featured Products
            </h2>
            <p className="text-sm text-muted-foreground">A few favorites from the collection.</p>
          </div>
          <Button variant="secondary">View All</Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden bg-card">
              <CardContent className="p-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image || "/placeholder.svg"} alt={p.name} className="aspect-[4/3] w-full object-cover" />
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.price}</p>
                </div>
                <Button>Add to cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
