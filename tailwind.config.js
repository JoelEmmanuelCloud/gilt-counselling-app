/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
