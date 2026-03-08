/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#991B1B', // Darker Red
          dark: '#7F1D1D',
          light: '#B91C1C',
        },
        accent: {
          DEFAULT: '#FBBF24', // Yellow
          dark: '#F59E0B',
          light: '#FCD34D',
        },
      },
    },
  },
  plugins: [],
}
