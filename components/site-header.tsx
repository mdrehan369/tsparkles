"use client";

import Link from "next/link";
import { ShoppingBag, Menu, Store, Info, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Brand } from "./brand";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetTitle></SheetTitle>
            <SheetContent side="left" className="w-72 p-0 bg-amber-50">
              {/* Sidebar Header */}
              <div className="border-b p-6" onClick={() => setOpen(false)}>
                <Brand />
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-2 p-6">
                <Link
                  onClick={() => setOpen(false)}
                  href="/products"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition"
                >
                  <Store className="h-4 w-4" />
                  Shop
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  href="/about"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition"
                >
                  <Info className="h-4 w-4" />
                  About
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  href="/contact"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>

              {/* Bottom Section */}
              <div className="mt-auto border-t p-6">
                <Button
                  onClick={() => setOpen(false)}
                  asChild
                  className="w-full"
                >
                  <Link href="/cart">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    View Cart
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand */}
        <Brand />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <Link href="#collection">View Collection</Link>
          </Button>

          <Button variant="default" size="icon" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
