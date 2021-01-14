const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: ['./components/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'main': '#3baac5',
        'dark': '#1d8ba7',
        'light': '#def8ff'
      }
    }
  },
  variants: {
    extend: {
      borderStyle: ['focus', 'active'],
      translate: ['motion-reduce'],
      transform: ['hover', 'focus'],
    },
  },
  plugins: [
    require('tailwindcss/colors')
  ],
}
