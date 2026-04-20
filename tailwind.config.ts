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
        coral: "#FF6B35",
        peach: "#FF9B7A",
        charcoal: "#1A1A1A",
        muted: "#555555",
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
        soft: "0 24px 70px rgba(26, 26, 26, 0.08)",
        lift: "0 18px 45px rgba(255, 107, 53, 0.18)"
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
