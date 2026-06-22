import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        organico: "#6B8E23",
        reciclable: "#1E90FF",
        noreciclable: "#4B4B4B",
      },
    },
  },
  plugins: [],
};

export default config;
