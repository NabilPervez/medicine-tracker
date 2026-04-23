/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#1A3A5C',
          light: '#2A4F7A',
          dark: '#0F2640',
        },
        teal: {
          DEFAULT: '#0D7A8A',
          light: '#12A3B8',
        },
        cream: '#F8F5EF',
        'card-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
