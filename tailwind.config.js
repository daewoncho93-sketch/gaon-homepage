/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { 50:"#f0f8ff",100:"#dfeffe",200:"#b7dbff",300:"#8cc2ff",400:"#5ea6ff",500:"#2f8aff",600:"#186fe6",700:"#1258b4",800:"#0d3f7f",900:"#07264a" } },
      boxShadow: { soft: "0 10px 25px rgba(0,0,0,0.08)" }
    },
  },
  plugins: [],
};
