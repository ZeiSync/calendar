
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1/7': '14.2657143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        '1/6': 'calc((100vh - 108px) / 6)'
      },
      colors: {
        'bright-gray': '#393E46',
        'bondi-blue': '#00ADB5',
        'sinbad': '#aad8d3',
        'gallery': '#EEEEEE',
      }
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
