"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "Please enter a valid email.",
        description: "We’ll only send an occasional note about new drops.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Thanks for joining!",
      description: "You’re on the list for T Sparkles updates.",
    })
    setEmail("")
  }

  return (
    <section id="contact" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Card className="bg-card">
          <CardContent className="flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
            <div>
              <h2 id="newsletter-title" className="text-xl font-semibold">
                Stay in the glow
              </h2>
              <p className="text-sm text-muted-foreground">Get updates on new handmade drops and limited scents.</p>
            </div>
            <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
