import { addDynamicIconSelectors } from '@iconify/tailwind';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { type Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      'xs':'390px',
      ...defaultTheme.screens,
      'sm': "640px",
      // => @media (min-width: 640px) { ... }

      'md': "768px",
      // => @media (min-width: 768px) { ... }

      'lg': "1024px",
      // => @media (min-width: 1024px) { ... }
      // 基础版心
      'wrapper': "1200px",

      'xl': "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
      '3xl':"1640px",
    },
    fontSize: {
      'xs':   ['0.75rem', '1rem'],          // 12px on 16px
      'sm':   ['0.84375rem', '1.1875rem'],  // 13.5px on 19px [Default: mobile]
      'base': ['0.875rem', '1.25rem'],      // 14px on 20px   [Default: desktop]
      'lg':   ['1rem', '1.25rem'],          // 16px on 20px
      'xl':   ['1.125rem', '1.25rem'],      // 18px on 20px
      '2xl':  ['1.25rem', '1.25rem'],       // 20px on 20px
      '3xl':  ['1.5rem', '1.5rem'],         // 24px on 24px
    },

    debugScreens: {
      position: ['bottom', 'right'],
      ignore: ['dark'],
    },

    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // borderRadius: {
      //   lg: `var(--radius)`,
      //   md: `calc(var(--radius) - 2px)`,
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      fontFamily: {
        // 'sans': ['Poppins', 'PingFang', ...fontFamily.sans],
        // 'firecode': ['Fira Code',...fontFamily.mono],
        'mono': ['var(--font-ibm-plex-mono)', ...defaultTheme.fontFamily.mono],

      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'cursor-blink': {
          '50%': { borderColor: 'transparent' },
        },
        'intro-scroll': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '0',
          },
          '20%': {
            transform: 'translateY(2px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(8px)',
            opacity: '0',
          },
        },
        'rotate-pulse': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.8)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'hover-drift': {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(1px, -2px)' },
          '40%': { transform: 'translate(1px, 1.5px)' },
          '60%': { transform: 'translate(-1px, 2px)' },
          '80%': { transform: 'translate(-1.5px, -1.75px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'hover-wobble': {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(3.5deg)' },
          '40%': { transform: 'rotate(-2deg)' },
          '60%': { transform: 'rotate(2.5deg)' },
          '80%': { transform: 'rotate(-2.5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // 光标闪烁动画
        'cursor-blink': 'cursor-blink 0.6s step-end infinite alternate',
        'intro-scroll': 'intro-scroll 3s ease infinite',

        'rotate-pulse':
            'rotate-pulse 0.75s linear infinite normal both running',
        'hover-drift':
            'hover-drift 8s linear infinite',
        'hover-wobble':
            'hover-wobble 6s linear infinite normal both running',
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    // 开发模式下加载显示屏幕大小的插件
    process.env.NODE_ENV === 'development' &&
    require('tailwindcss-debug-screens'),
    // Iconify plugin
    addDynamicIconSelectors(),
    // 动画插件
    require('tailwindcss-animated'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config;
