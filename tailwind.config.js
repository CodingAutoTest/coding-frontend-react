/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nunito-sans': ['"Nunito Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
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
  plugins: [scrollbarHide],
};
