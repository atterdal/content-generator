import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/apps/**/*.{js,ts,jsx,tsx,mdx}',
    // HeroUI content
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Habo IF Brand Colors
        'habo-blue': '#0629A0',
        'habo-gold': '#B6975C',
        'habo-beige': '#f0ede6',
        'habo-white': '#FFFFFF',
        'habo-void': '#030133',
        'habo-gradient-start': '#11669f',
        'habo-gradient-end': '#002e6a',
      },
      fontFamily: {
        'habo-primary': ['"Alverata Black"', 'Georgia', 'serif'],
        'habo-secondary': ['"PT Serif"', 'serif'],
      },
      backgroundImage: {
        'habo-gradient': 'linear-gradient(135deg, #11669f 0%, #002e6a 100%)',
        'habo-gradient-dark': 'linear-gradient(135deg, #030133 0%, #11669f 100%)',
        'habo-gradient-50': 'linear-gradient(50deg, #11669f 0%, #0629A0 100%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#11181C',
            primary: {
              50: '#E8F0FE',
              100: '#C5D9FC',
              200: '#9EC1FA',
              300: '#77A9F8',
              400: '#5091F6',
              500: '#0629A0', // Habo IF Royal Blue
              600: '#051F7A',
              700: '#041558',
              800: '#030C36',
              900: '#020414',
              DEFAULT: '#0629A0',
              foreground: '#FFFFFF',
            },
            secondary: {
              50: '#FAF6EE',
              100: '#F2E8D5',
              200: '#E9D9BC',
              300: '#E0CAA3',
              400: '#D7BB8A',
              500: '#B6975C', // Habo IF Heritage Gold
              600: '#9E7E45',
              700: '#86652E',
              800: '#6E4C17',
              900: '#563300',
              DEFAULT: '#B6975C',
              foreground: '#FFFFFF',
            },
            success: {
              DEFAULT: '#17C964',
              foreground: '#FFFFFF',
            },
            warning: {
              DEFAULT: '#F5A524',
              foreground: '#FFFFFF',
            },
            danger: {
              DEFAULT: '#F31260',
              foreground: '#FFFFFF',
            },
          },
        },
        dark: {
          colors: {
            background: '#0C0C0C',
            foreground: '#ECEDEE',
            primary: {
              50: '#020414',
              100: '#030C36',
              200: '#041558',
              300: '#051F7A',
              400: '#0629A0',
              500: '#5091F6',
              600: '#77A9F8',
              700: '#9EC1FA',
              800: '#C5D9FC',
              900: '#E8F0FE',
              DEFAULT: '#0629A0',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#B6975C',
              foreground: '#FFFFFF',
            },
          },
        },
        // Custom Habo IF theme
        habo: {
          extend: 'light',
          colors: {
            background: '#f0ede6', // Classic Beige
            foreground: '#0629A0', // Royal Blue
            primary: {
              DEFAULT: '#0629A0',
              foreground: '#FFFFFF',
            },
            secondary: {
              DEFAULT: '#B6975C',
              foreground: '#FFFFFF',
            },
            default: {
              DEFAULT: '#f0ede6',
              foreground: '#0629A0',
            },
          },
        },
      },
    }),
  ],
};

export default config;