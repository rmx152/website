/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts}',  
    './layouts/**/*.{vue,js,ts}',     
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], 
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono], 
      },
      colors: {
        'catppuccin-dark': '#1e1e2e',
        'catppuccin-gray': '#a6adc8',
        'catppuccin-milk': '#bac2de',
        'catppuccin-red': '#f38ba8',
        'catppuccin-green': '#a6e3a1',
        'catppuccin-yellow': '#fabd2f',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  
    require('@tailwindcss/typography'),  
    require('tailwind-scrollbar'),  
  ],
};
