/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx,json}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        gold: "#F6E05E"
      }
    },
  },
  plugins: [],
}
