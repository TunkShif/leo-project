/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
        }
      }
    }
  },
  plugins: []
}
