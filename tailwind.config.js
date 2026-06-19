/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sky: {
          dawn: '#FF9A3C',
          sunrise: '#FFC857',
          morning: '#FFE29A',
          day: '#87CEEB',
          light: '#B8E3FF',
          white: '#FFFFFF',
          dusk: '#5B2C6F',
          sunset: '#E74C3C',
          gold: '#F39C12',
          night: '#1a1a2e',
          deep: '#16213e',
          midnight: '#0f3460',
        },
        brand: {
          50: '#E6F4FE',
          100: '#B8E3FF',
          200: '#87CEEB',
          300: '#5B9BD5',
          400: '#3A7BD5',
          500: '#1a1a2e',
          600: '#16213e',
          700: '#0f3460',
          800: '#0a1628',
          900: '#050d18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'System'],
      },
    },
  },
  plugins: [],
};
