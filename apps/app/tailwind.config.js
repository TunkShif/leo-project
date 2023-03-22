const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      ...defaultTheme.borderRadius,
      xs: "0.125rem",
      sm: "0.25rem"
    },
    fontFamily: {
      sans: ['"Inter var"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        autumn: {
          50: "#f9f5ed",
          100: "#f1e6d0",
          200: "#e4cda4",
          300: "#d5ab6f",
          400: "#c58940",
          500: "#b8793a",
          600: "#9e5f30",
          700: "#7f4629",
          800: "#6b3a28",
          900: "#5c3327"
        },
        tomato: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#ffc9c9",
          300: "#fd8a8a",
          400: "#fa6f6f",
          500: "#f24141",
          600: "#df2323",
          700: "#bc1919",
          800: "#9b1919",
          900: "#811b1b"
        }
      }
    }
  },
  plugins: [require("@kobalte/tailwindcss")]
}
