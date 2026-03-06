"use client"

import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"
import { Brand } from "./brand"

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Brand />
          <p className="max-w-xs text-sm text-muted-foreground">
            Small handmade candles and things, thoughtfully crafted for your cozy rituals.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p className="font-medium">Shop</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <Link href="#shop" className="hover:text-foreground">
                  Candles
                </Link>
              </li>
              <li>
                <Link href="#collection" className="hover:text-foreground">
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Info</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <Link href="#about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="space-y-2 text-sm">
          <p className="font-medium">Connect</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-primary" />
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:hello@tsparkles.example">hello@tsparkles.example</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+10000000000">+1 (000) 000-0000</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} T Sparkles. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
