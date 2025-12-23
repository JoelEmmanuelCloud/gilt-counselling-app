/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-gold': '#D4AF7A',
        'warm-sand': '#E8D4B8',
        'muted-teal': '#7B9C98',
        'olive-green': '#8B9A7A',
        'warm-cream': '#F5F1E8',
        'off-white': '#FDFBF7',
        'light-grey': '#E5E5E5',
        'soft-beige': '#D9D1C7',
        'muted-coral': '#D4998A',
        'soft-terracotta': '#C17B68',
        'gentle-blue-grey': '#9BA8AB',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Lora', 'serif'],
        'body': ['Inter', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
