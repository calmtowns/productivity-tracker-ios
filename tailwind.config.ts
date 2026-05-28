import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF6',
          100: '#F8F3EC',
          200: '#F0E8DC',
          300: '#E5D8C8',
        },
      },
      boxShadow: {
        card: '0 2px 12px rgba(92, 60, 30, 0.08)',
        'card-md': '0 4px 24px rgba(92, 60, 30, 0.14)',
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
