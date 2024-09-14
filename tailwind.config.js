/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#151515',
        lightBg: '#eeeeee',
        accent1: '#73659e',
        accent2: '#a91d3a',
        textPrimary: '#eeeeee',
        textSecondary: '#151515'
      },
      spacing: {},
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem'
      },
      boxShadow: {
        'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
      transform: {
        'scale-110': 'scale(1.1)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
