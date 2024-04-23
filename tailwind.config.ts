import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
  },
  theme: {
    screens: {
      xs: '460px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        gray00: '#FFFFFF',
        gray01: '#FCFAF8',
        gray02: '#F7F5F3',
        gray03: '#F1EFED',
        gray04: '#E3E1DF',
        gray05: '#C0BFBD',
        gray06: '#A2A09E',
        gray07: '#787775',
        gray08: '#646361',
        gray09: '#454342',
        gray10: '#242221',
        gray11: '#000000',

        // gray10 , gray08, gray06 === text01, text02, text03
        // gray01 , gray02, gray03 === bg01, bg02, bg03

        orange01: '#FDF3E4',
        orange02: '#FBDFBD',
        orange03: '#F9CB94',
        orange04: '#F5B76E',
        orange05: '#F4A857',
        orange06: '#F39945',
        orange07: '#EE8E41',
        orange08: '#E6803E',
        orange09: '#DF7238',
        orange10: '#D45c31',

        primaryAmber: '#F6B66E',
        primaryOrange: '#F39945',
        primaryBeige: '#F5E6C5',
        primaryIvory: '#FCFAF8',
        primaryDark: '#242221',
        primaryRed: '#EB5252',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        nav: '0 -4px 20px 0 rgba(0, 0, 0, 0.05)',
      },
      lineHeight: {
        normal: 'normal',
      },
      fontSize: {
        xs: ['12px', 'normal'],
        sm: ['14px', 'normal'],
        base: ['16px', 'normal'],
        lg: ['18px', 'normal'],
        xl: ['20px', 'normal'],
      },
      gradientColorStopPositions: {
        66.15: '66.15%',
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
