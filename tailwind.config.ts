import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/apps/**/*.{js,ts,jsx,tsx,mdx}',
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
  plugins: [],
};

export default config;