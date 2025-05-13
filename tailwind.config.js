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
        WHITE: '#FFFFFF',
        DISABLED: '#979797',
        divider: {
          DEFAULT: '#E6EFF5',
          DARK: '#D8E3E9',
        },
        problem: {
          BACKGROUND: '#E2E2E2',
          TAB_BAR: '#E9E9E9',
          DIVIDER: '#73808D',
          COMPONENT_HEADER: '#F4F4F4',
          FAIL: '#DF0404',
          SUCCESS: '#008767',
        },
      },
    },
  },
  plugins: [scrollbarHide],
};
