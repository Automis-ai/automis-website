export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1320px',
      },
    },
    extend: {
      screens: {
        'menu-break': '1232px',
      },
      colors: {
        'deep-blue': '#000a14',
        'bright-blue': '#3C91E6',
        'soft-blue': '#B4C2FF',
        'warm-yellow': '#F5CD79',

        'bg-primary': '#000a14',
        'blue': {
          'darkest': '#000a14',
          'middle': '#3C91E6',
          'lightest': '#B4C2FF',
        },

        'yellow': {
          'dark': '#F49F01',
          'light': '#F5CD79',
        },
        'section': {
          'black': '#000000',
          'dark': '#000a14',
        },
        'text': {
          'light': 'rgba(255, 255, 255, 0.9)',
          'muted': 'rgba(255, 255, 255, 0.6)',
          'white': '#FFFFFF',
          'black': '#000000',
          'blue': '#B4C2FF',
        },
        'border': {
          'light': 'rgba(255, 255, 255, 0.2)',
        },
        'primary': '#000a14',
        'secondary': '#3C91E6',
      },
      backgroundColor: {
        'page': '#000a14',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'inter': ['Open Sans', 'sans-serif'],
        'work-sans': ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
        'container-1695': '1725px',
        'container-1660': '1690px',
        'container-1520': '1550px',
        'container-1500': '1530px',
        'container-1450': '1480px',
        'container-1370': '1400px',
        'container-1070': '1200px',
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.2' }],
        'h2': ['2.25rem', { lineHeight: '1.3' }],
        'h3': ['1.75rem', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'list': ['1rem', { lineHeight: '1.6' }],
        'nav': ['1rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'section-y': 'clamp(3.5rem, 5rem, 6rem)',
        'card': '1.5rem',
        'btn-x': '2rem',
        'btn-y': '0.875rem',
        'grid-desktop': '2rem',
        'grid-tablet': '1.25rem',
        'grid-mobile': '1rem',
      },
      minHeight: {
        'card': '360px',
        'button': '52px',
      },
      height: {
        'nav': '76px',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'nav': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'cta-hover': '0 8px 24px rgba(0, 0, 0, 0.22)',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '1': 'repeat(1, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}