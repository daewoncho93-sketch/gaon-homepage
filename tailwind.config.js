/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#f4f7fb",100:"#e9eff7",200:"#c9d9ee",300:"#98b6de",400:"#5b8fcb",
          500:"#2f66a8",600:"#224e84",700:"#1a3d69",800:"#142f51",900:"#0f263f"
        }
      }
    }
  },
  plugins: []
};
