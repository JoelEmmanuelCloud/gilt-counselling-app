/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gilt-gold': '#D4A855',
        'gilt-blue': '#0A7EA4',
        'gilt-green': '#6BBE92',
        'gilt-orange': '#F5A623',
      },
    },
  },
  plugins: [],
}
