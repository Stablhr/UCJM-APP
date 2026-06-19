/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './App.tsx'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        parchment: '#f0f0eb',
        gallery: '#ffffff',
        linen: '#e1e1db',
        mist: '#d7d7cf',
        stone: '#cbcbc5',
        ash: '#bfbfb8',
        graphite: '#575753',
        charcoal: '#464643',
        ink: '#111110',
        orange: '#ff3b00',
        teal: '#042a2b',
      },
      fontFamily: {
        sans: ['Aileron', 'System'],
        serif: ['Anton', 'System'],
      },
    },
  },
  plugins: [],
};
