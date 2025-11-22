/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f3',
          100: '#fff0e6',
          200: '#ffd9b8',
          300: '#ffb77a',
          400: '#ff8f3f',
          500: '#ff6b14',
          600: '#e65e12',
          700: '#b84a0e',
        },
      },
      boxShadow: {
        'soft-lg': '0 12px 30px rgba(15, 15, 15, 0.08)',
      },
      borderRadius: {
        'xl2': '1rem',
      },
    },
  },
  plugins: [],
}
