/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary-pink': {
        100: '#fff6f6',
        200: '#ffdfdf',
        300: '#f87aac',
        400: '#f875ac',
        800: '#e72473'
      },
      'red-trash': '#ef4444',
      'gradient-purple': '#9370db',
      'gradient-green': '#40e0d0',
      'gradient-blue': '#007bff',
    },
    extend: {},
  },
  plugins: [],
}