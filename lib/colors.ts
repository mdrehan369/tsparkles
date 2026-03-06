// Centralized brand palette for T Sparkles
export const TSparklesColors = {
  // Core brand
  primary: "#7A4DE8", // rich purple
  primaryForeground: "#FFFFFF",

  // Light yellowish theme
  accent: "#FFF1B8", // soft buttery yellow
  accentForeground: "#2B2333",

  // Surfaces
  background: "#FFFBF0", // warm cream
  foreground: "#2B2333", // deep plum/charcoal
  card: "#FFF8DF", // slightly deeper cream
  cardForeground: "#2B2333",

  // Supporting
  muted: "#8F82A7", // muted lavender
  mutedForeground: "#4B415C",
  border: "#ECDDF7",
  ring: "#C7A6FF",

  // Hover states
  primaryHover: "#6A3DDA",
  accentHover: "#FFE89A",
}

// Optionally export a helper map for CSS variables
export const TSparklesCssVars: Record<string, string> = {
  "--background": TSparklesColors.background,
  "--foreground": TSparklesColors.foreground,
  "--card": TSparklesColors.card,
  "--card-foreground": TSparklesColors.cardForeground,
  "--popover": TSparklesColors.card,
  "--popover-foreground": TSparklesColors.foreground,
  "--primary": TSparklesColors.primary,
  "--primary-foreground": TSparklesColors.primaryForeground,
  "--secondary": TSparklesColors.accent,
  "--secondary-foreground": TSparklesColors.accentForeground,
  "--muted": TSparklesColors.accent,
  "--muted-foreground": TSparklesColors.mutedForeground,
  "--accent": TSparklesColors.accent,
  "--accent-foreground": TSparklesColors.accentForeground,
  "--destructive": "#E11D48",
  "--destructive-foreground": "#FFFFFF",
  "--border": TSparklesColors.border,
  "--input": TSparklesColors.border,
  "--ring": TSparklesColors.ring,
}
