import type * as React from "react"
import { TSparklesCssVars } from "@/lib/colors"

type ThemeProps = {
  children: React.ReactNode
}

export function Theme({ children }: ThemeProps) {
  // Apply brand CSS variables scoped to this wrapper
  return (
    <div style={TSparklesCssVars as React.CSSProperties} className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}
