/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#fbfaf8',
          100: '#f5f2ec',
          200: '#e8e2d5',
          300: '#d7ccb8',
          400: '#c2b095',
          500: '#a89274',
          600: '#8c765a',
          700: '#705c45',
          800: '#584836',
          900: '#433729',
        },
        terracotta: {
          50: '#fdf8f6',
          100: '#f2e8e3',
          200: '#e5d1c7',
          300: '#d3b09f',
          400: '#bd8b74',
          500: '#a76a4f',
          600: '#8f533a',
          700: '#75402b',
          800: '#5e3221',
          900: '#492619',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e5ebe6',
          200: '#ced9cf',
          300: '#adc0b0',
          400: '#87a28b',
          500: '#67856c',
          600: '#506a55',
          700: '#405444',
          800: '#344437',
          900: '#2c382f',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 6px -1px rgba(0, 0, 0, 0.05), 0 1px 4px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 20px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
