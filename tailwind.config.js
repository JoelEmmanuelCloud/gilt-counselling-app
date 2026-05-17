
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'gilt-gold': '#D9A85D',
        'gilt-teal': '#1BA5BB',
        'gilt-green': '#5FB74E',
        'gilt-orange': '#F5A623',
        'soft-gold': '#D9A85D',
        'warm-sand': '#FFF4E6',
        'muted-teal': '#1BA5BB',
        'olive-green': '#5FB74E',
        'warm-cream': '#F5F1E8',
        'off-white': '#FDFBF7',
        'light-grey': '#E5E5E5',
        'soft-beige': '#D9D1C7',
        'muted-coral': '#F5A623',
        'soft-terracotta': '#D9A85D',
        'gentle-blue-grey': '#1BA5BB',
        'light-teal': '#E8F4F6',
        'light-gold': '#FFF4E6',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Lora', 'serif'],
        'body': ['Inter', 'Open Sans', 'sans-serif'],
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.07)' },
          '100%': { transform: 'scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 8s ease-out forwards',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
