/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#BC0B0B",
          yellow: "#FACC15",
          dark: "#1F2937",
        }
      },
    },
  },
  plugins: [],
}
