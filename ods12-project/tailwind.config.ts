import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Paleta ODS 12 — verde como color primario
      colors: {
        ods12: {
          verde: "#BF8B2E",
          claro: "#D4A843",
          oscuro: "#8B6320",
          fondo: "#F9F5EC",
        },
        primario: {
          DEFAULT: "#1A6B3A",
          claro: "#27AE60",
          muy_claro: "#D6F0E0",
        },
      },
      // Fuente mínima 16px — regla copilot-instructions
      fontSize: {
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
        sm: ["0.9375rem", { lineHeight: "1.375rem" }], // 15px mínimo
      },
    },
  },
  plugins: [],
} satisfies Config;
