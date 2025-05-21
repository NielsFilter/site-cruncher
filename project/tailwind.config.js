/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00897b',
          dark: '#00564d',
        },
        dark: {
          DEFAULT: '#282828',
          lighter: '#363636',
        },
        gray: {
          DEFAULT: '#969696',
          100: '#f3f4f6',
          700: '#374151',
        },
        success: {
          DEFAULT: '#4caf50',
          light: '#a5d6a7',
          dark: '#2e7d32',
        },
        warning: {
          DEFAULT: '#ff9800',
          light: '#ffcc80',
          dark: '#ef6c00',
        },
        error: {
          DEFAULT: '#f44336',
          light: '#ef9a9a',
          dark: '#c62828',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};