const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'main': '#3baac5',
        'dark': '#1d8ba7'
      }
    }
  },
  variants: {
    extend: {
      translate: ['motion-reduce'],
      transform: ['hover', 'focus'],
    },
  },
  plugins: [
    require('tailwindcss/colors')
  ],
}
