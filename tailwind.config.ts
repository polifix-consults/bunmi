import type { Config } from "tailwindcss";

/**
 * Editorial design tokens.
 * Palette: warm off-white "paper", deep charcoal "ink", muted maroon "accent",
 * near-black "dark" for cinematic sections.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F1E6", // warm cream — primary page background
          deep: "#EFE8D9", // slightly deeper cream for section alternation
          bright: "#FBF8F1", // lightest cream — cards, nav surface
          toned: "#E9E0CD",
        },
        ink: {
          DEFAULT: "#0F1E36", // deep navy charcoal — body copy
          soft: "#334E68", // secondary navy copy
          faint: "#627D98", // tertiary / captions
        },
        navy: {
          50: "#F0F5FA",
          100: "#E1ECF6",
          200: "#C4D9ED",
          300: "#97BDDF",
          400: "#629ACF",
          500: "#3D7DBE",
          600: "#2B63A3",
          700: "#214E83",
          800: "#1A3F6C",
          900: "#0A2540", // Core Primary Navy Blue
          950: "#061628", // Deep Midnight Navy
          DEFAULT: "#0A2540",
        },
        accent: {
          DEFAULT: "#0A2540", // Navy Blue — primary accent
          deep: "#061628", // Deep Midnight Navy hover state
          tint: "#EBF2F9", // Soft Ice Navy wash
        },
        dark: {
          DEFAULT: "#081A2F", // Cinematic Navy Dark
          soft: "#0E233D", // Raised Navy Surface
          line: "#1B3A60", // Dark Navy borders
        },
        line: "#D9E2EC", // hairline borders
      },
      fontFamily: {
        inter: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
      },
      maxWidth: {
        shell: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
