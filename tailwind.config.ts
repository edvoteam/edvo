import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        edvo: {
          teal:         "#0d7a8c",
          "teal-dark":  "#0a5e6d",
          "teal-mid":   "#0e9db5",
          "teal-light": "#e0f5f8",
          "teal-xl":    "#f2fbfc",
          gold:         "#f5c518",
          "gold-dark":  "#c49a00",
          "gold-light": "#fef9e3",
          dark:         "#071e22",
          body:         "#1a3a40",
          grey:         "#5a7a82",
          "light-grey": "#b8d4d8",
          bg:           "#f2f8f9",
          green:        "#0f9b6e",
          "green-light":"#d4f5e8",
          red:          "#c0392b",
          "red-light":  "#faeae8",
          amber:        "#d4860a",
          "amber-light":"#fef0d0",
        },
      },
    },
  },
  plugins: [],
};

export default config;