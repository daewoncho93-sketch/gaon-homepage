/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Noto Sans KR","Apple SD Gothic Neo","Arial","sans-serif"]
      },
      boxShadow: {
        smooth: "0 10px 30px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: [],
}
