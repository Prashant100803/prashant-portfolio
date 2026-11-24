/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#090909',
          deep: '#050505',
          surface: '#181818',
          surfaceHover: '#222222',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(220, 38, 38, 0.45)',
        },
        crimson: {
          DEFAULT: '#DC2626',
          bright: '#EF4444',
          dark: '#991B1B',
          glow: 'rgba(220, 38, 38, 0.35)',
        },
        content: {
          white: '#FFFFFF',
          secondary: '#A3A3A3',
          dim: '#737373',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        liquid: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        crimsonGlow: '0 0 35px -5px rgba(220, 38, 38, 0.45)',
        redEdge: '0 0 20px 2px rgba(239, 68, 68, 0.35)',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
        'dark-cinematic': 'radial-gradient(ellipse at top, #1c0507 0%, #090909 60%, #050505 100%)',
      },
    },
  },
  plugins: [],
}
