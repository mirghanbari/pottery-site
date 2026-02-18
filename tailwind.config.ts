import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#f7f2ed",
          100: "#ede1d7",
          300: "#cda88d",
          500: "#a86f4f",
          700: "#71412e",
          900: "#3e2418"
        },
        moss: "#2f5f53",
        peach: "#f0a98f",
        ink: "#1f1b19"
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 64px rgba(31, 27, 25, 0.15)",
        glow: "0 0 0 8px rgba(240, 169, 143, 0.22)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        spinSlow: "spinSlow 24s linear infinite"
      }
    },
  },
  plugins: [],
} satisfies Config;
