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
          teal:         "#007090",
          "teal-dark":  "#005a73",
          "teal-mid":   "#007090",
          "teal-light": "#e0f0f5",
          "teal-xl":    "#f0f7f9",
          gold:         "#f5c518",
          "gold-dark":  "#c49a00",
          "gold-light": "#fef9e3",
          dark:         "#071e22",
          body:         "#1a3a40",
          grey:         "#5a7a82",
          "light-grey": "#a0c8d8",
          bg:           "#f0f7f9",
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