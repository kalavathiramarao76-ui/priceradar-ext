/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#0891b2',
        accent: '#06b6d4',
        surface: '#0f172a',
        'surface-light': '#1e293b',
        'surface-lighter': '#334155',
      },
    },
  },
  plugins: [],
};
