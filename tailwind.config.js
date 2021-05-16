module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      fog: {
        DEFAULT: '#f4f9f4',
      },
      pantone: {
        light: '#a7d7c5',
        DEFAULT: '#74b49b',
        dark: '#5c8d89',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
