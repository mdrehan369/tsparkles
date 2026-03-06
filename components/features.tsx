"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Flame, Leaf, Recycle } from "lucide-react"

const items = [
  {
    icon: Flame,
    title: "Hand-poured",
    desc: "Every candle is made in small batches for quality and care.",
  },
  {
    icon: Leaf,
    title: "Natural scents",
    desc: "Clean-burning wax and gentle, nature-inspired aromas.",
  },
  {
    icon: Recycle,
    title: "Eco packaging",
    desc: "Recyclable materials with minimal, lovely presentation.",
  },
]

export function Features() {
  return (
    <section aria-labelledby="features-title" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 id="features-title" className="mb-8 text-center text-2xl font-semibold">
          What makes us special
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((f) => (
            <Card key={f.title} className="bg-card">
              <CardContent className="flex items-start gap-4 p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <f.icon className="text-primary" />
                </span>
                <div>
                  <h3 className="font-medium">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
