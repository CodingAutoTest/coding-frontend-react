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
        primary: '#4F46E5',
        'problem-BACKGROUND': '#F5F5F5',
        'problem-COMPONENT_HEADER': '#FFFFFF',
        'problem-DIVIDER': '#E5E7EB',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        slide: 'slide 20s linear infinite',
        float: 'float 8s ease-in-out infinite',
        glow: 'glow 8s ease-in-out infinite',
      },
    },
  },
  plugins: [scrollbarHide],
};
