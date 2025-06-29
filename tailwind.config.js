/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'var(--primary-foreground)',
          background: 'var(--primary-background)',
          hovered: 'rgba(var(--primary-hovered))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        link: {
          text: 'var(--link-text)',
          background: 'var(--link-background)',
        },
        success: {
          DEFAULT: 'var(--success)',
          background: 'var(--success-background)',
          backgroundLite: 'var(--success-background-lite)',
          dark: 'var(--success-dark)',
        },
        error: {
          DEFAULT: 'var(--error)',
          background: 'var(--error-background)',
        },
        pause: {
          background: 'var(--pause-background)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar-background)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-hovered': 'var(--sidebar-accent-hovered)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          'accent-foreground-hovered': 'var(--sidebar-accent-foreground-hovered)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        sunset: {
          gold: 'var(--sunset-gold)',
          background: 'var(--sunset-background)',
        },
        icon: {
          background: 'var(--icon-background)',
        },
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '48px',
        '6xl': '64px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [import('tailwindcss-animate')],
};
