/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './context/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d30b15',
          redDark: '#9e0710',
          white: '#f8f8f8',
          black: '#0c0c0c'
        }
      },
      fontFamily: {
        heading: ['Anton', 'sans-serif'],
        body: ['Barlow', 'sans-serif']
      },
      boxShadow: {
        premium: '0 20px 60px rgba(211, 11, 21, 0.2)'
      }
    }
  },
  plugins: []
};
