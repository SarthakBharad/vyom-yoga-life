/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        cream:      '#fcf9f0',
        linen:      '#ead2bc',
        terracotta: '#be8050',
        walnut:     '#6b4f3f',
        taupe:      '#b59780',
        caramel:    '#cd7d3e',
        espresso:   '#512815',
        ink:        '#1a0c06',
        char:       '#2a160a',
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          inverse:   '#fcf9f0',
        },
      },

      fontFamily: {
        display: ['Lora', 'serif'],
        body:    ['Mulish', 'sans-serif'],
      },

      fontSize: {
        h1:     ['3rem',     { lineHeight: '1.15' }],
        h2:     ['2.25rem',  { lineHeight: '1.2'  }],
        h3:     ['1.75rem',  { lineHeight: '1.3'  }],
        h4:     ['1.25rem',  { lineHeight: '1.4'  }],
        body:   ['1rem',     { lineHeight: '1.6'  }],
        bodylg: ['1.125rem', { lineHeight: '1.6'  }],
        bodysm: ['0.875rem', { lineHeight: '1.5'  }],
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'      },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        lift: {
          '0%':   { transform: 'scale(1) translateY(0)', boxShadow: '0 2px 16px rgba(52,62,72,0.08)' },
          '100%': { transform: 'scale(1.05) translateY(-8px)', boxShadow: '0 8px 40px rgba(52,62,72,0.14)' },
        },
      },

      animation: {
        'fade-up':    'fadeUp 0.7s ease-out forwards',
        'fade-up-d1': 'fadeUp 0.7s ease-out 0.15s forwards',
        'fade-up-d2': 'fadeUp 0.7s ease-out 0.30s forwards',
        'fade-up-d3': 'fadeUp 0.7s ease-out 0.45s forwards',
        'fade-up-d4': 'fadeUp 0.7s ease-out 0.60s forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'lift':       'lift 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },

      boxShadow: {
        card:        '0 2px 16px rgba(52,62,72,0.08)',
        'card-lg':   '0 8px 40px rgba(52,62,72,0.14)',
        'inner-top': 'inset 0 4px 12px rgba(52,62,72,0.06)',
        'dark-card': '0 2px 16px rgba(0,0,0,0.30)',
      },

      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
    },
  },
  plugins: [],
}