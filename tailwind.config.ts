import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5EDE4",
        "cream-2": "#EFE4D6",
        "cream-3": "#FAF5EE",
        coral: "#FF6B35",
        "coral-600": "#E9551F",
        peach: "#FF9B7A",
        charcoal: "#1A1A1A",
        muted: "#555555",
        "muted-2": "#8A8076",
        ink: "#000000",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 15, 15, 0.06), 0 2px 6px rgba(15, 15, 15, 0.04)",
        lift: "0 20px 60px rgba(15, 15, 15, 0.12), 0 4px 12px rgba(15, 15, 15, 0.06)"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #F5EDE4 0%, #FFC5A8 100%)",
        "cta-gradient": "linear-gradient(135deg, #FF6B35 0%, #FF9B7A 100%)"
      },
      borderRadius: {
        lg: "8px",
        md: "8px",
        sm: "6px"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
