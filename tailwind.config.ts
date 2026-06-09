import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#fbfaf7",
        moss: "#546a4a",
        rust: "#b65634",
        brass: "#c7a650",
        cloud: "#eff3ef"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(23, 23, 23, 0.12)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;
