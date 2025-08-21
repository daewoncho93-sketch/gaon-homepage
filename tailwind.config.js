
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gaon: {
          primary: "#0F172A",   // slate-900-ish
          accent: "#2563EB",    // blue-600
          gold: "#C8A24D",
        }
      }
    },
  },
  plugins: [],
};
