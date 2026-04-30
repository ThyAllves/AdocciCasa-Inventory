/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'adocci-gold': '#ebb133', // Uma cor personalizada para a marca Adocci Casa
        'adocci-dark': '#252b47',
      }
    },
  },
  plugins: [],
}