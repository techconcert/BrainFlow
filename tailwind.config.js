/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brain: {
          bg: '#060B14',
          card: 'rgba(13, 24, 44, 0.7)',
          cardBorder: 'rgba(56, 189, 248, 0.15)',
          cyan: '#00E5FF',
          amber: '#FFB703',
          magenta: '#FF007F',
          emerald: '#00F59B',
          purple: '#A855F7',
          blue: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.35)',
        'glow-amber': '0 0 25px rgba(255, 183, 3, 0.35)',
        'glow-magenta': '0 0 25px rgba(255, 0, 127, 0.35)',
        'glow-emerald': '0 0 25px rgba(0, 245, 155, 0.35)',
      }
    },
  },
  plugins: [],
}
