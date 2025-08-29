import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f5ff",
          100: "#e6ebff",
          200: "#c2ccff",
          300: "#9eaeff",
          400: "#7287fd",
          500: "#4c5bf7",
          600: "#3844d4",
          700: "#2c35a8",
          800: "#232b84",
          900: "#1e256c"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [],
};
export default config;
