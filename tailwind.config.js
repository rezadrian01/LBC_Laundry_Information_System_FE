/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-pink': {
          100: '#fff6f6',
          200: '#ffdfdf',
          250: '#f9b8c6',
          300: '#f87aac',
          400: '#f875aa',
          500: '#f54394',
          600: '#f03285',
          700: '#e91f7b',
          800: '#e72473',
          900: '#d21465',
          950: '#c70f5d'  
        },
        'red-trash': '#ef4444',
        'gradient-purple': '#9370db',
        'gradient-cyan': '#40e0d0',
        'gradient-blue': '#007bff',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button': {
          display: 'none',
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          display: 'none'
        },
        'input[type="number"]': {
          'moz-appearance': 'textField',
          '-webkit-appearance': 'none'
        }
      });
    }
  ],
}