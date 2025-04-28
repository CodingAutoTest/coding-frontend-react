/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        PRIMARY: '#4866C9',
        DEFAULT: '#232323',
        DISABLED: '#979797',
        divider: {
          DEFAULT: '#E6EFF5',
          DARK: '#D8E3E9',
        },
      },
    },
  },
  plugins: [],
};
