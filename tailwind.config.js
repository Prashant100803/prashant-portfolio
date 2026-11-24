/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080B16',
          surface: '#14192B',
          surfaceElevated: '#1A2138',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(139, 92, 246, 0.35)',
        },
        accent: {
          violet: '#8B5CF6',
          cyan: '#22D3EE',
          glow: 'rgba(139, 92, 246, 0.15)',
        },
        light: {
          text: '#F1F5F9',
          muted: '#94A3B8',
          dim: '#64748B',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        cyanGlow: '0 0 25px -5px rgba(34, 211, 238, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
