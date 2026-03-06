"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Brand({ size = 24 }: { size?: number }) {
  return (
    <Link
      href="/"
      aria-label="T Sparkles Home"
      className="inline-flex items-center gap-2"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/70">
        <Sparkles className="text-primary" size={size} />
      </span>
      <span className="font-semibold tracking-tight">Firdaus Collective</span>
    </Link>
  );
}
