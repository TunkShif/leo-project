/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#a4b5bd",
          100: "#8fa1ad",
          200: "#798c9c",
          300: "#64768c",
          400: "#4f607b",
          500: "#3b496a",
          600: "#263159",
          700: "#1e2b4a",
          800: "#17233b",
          900: "#101b2b"
        }
      }
    }
  },
  plugins: []
}
