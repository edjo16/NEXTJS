
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['open-sans', 'Georgia', 'serif'],
        body: ['open-sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
      'custom-gradient':
      'linear-gradient(to top, rgba(0,88,111,100) 0%, rgba(0,88,111,70) 15%, rgba(0,88,111,90) 38%, rgba(0,0,0,0) 55%)',
      'custom-gradient-big':
      'linear-gradient(to top, rgba(0,88,111,100) 0%, rgba(0,88,111,70) 15%, rgba(0,88,111,90) 38%, rgba(0,0,0,0) 44%)',
      'background-news':
      'linear-gradient(135deg, #7b4397 0%, #f5af19 100%)',
      'background-global':
      'linear-gradient(to right, #010D49 0%, #03156B 30%, #021C8B 45%, #021C8B 55%, #03156B 80%, #010D49 100%)',
      'background-team':
      'linear-gradient(to right, #00586F 0%, #002C38 100%)',
      'background-dark-b':
      'linear-gradient(to bottom, #00586F 0%, #002C38 100%)',
     },
      colors: {
        primary: {
          50: '#005964',
          100: '#ffe4e6',
          200: '#00ACA0',
          300: '#fda4af',
          400: '#fb7185',
          500: '#00586F',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#002C38',
        },
        secondary: {
          50: '#fbefe6',
          100: '#f2cdb0',
          200: '#ecb58a',
          300: '#e49454',
          400: '#de7f33',
          500: '#d65f00',
          600: '#c35600',
          700: '#984300',
          800: '#763400',
          900: '#5a2800',
        },
        celeste: {
          500: '#97d1dc',
          400: '#acdae3',
          300: '#b9e0e8',
          200: '#cfeaef',
          100: '#dff1f4',
          50: '#f5fafc',
          600: '#89bec8',
          700: '#6b949c',
          800: '#537379',
          900: '#9AC8D1',
        },
        gray: {
          50: '#f2f2f3',
          100: '#d6d8d9',
          200: '#c2c5c6',
          300: '#a7abad',
          400: '#919199',
          500: '#7b8184',
          600: '#707578',
          700: '#575c5e',
          800: '#444749',
          900: '#343637',
        },
        terracota: {
          50: '#fbefe6',
          100: '#f2cdb0',
          200: '#ecb58a',
          300: '#e49454',
          400: '#de7f33',
          500: '#d65f00',
          600: '#c35600',
          700: '#984300',
          800: '#763400',
          900: '#5a2800',
        },
        ocre: {
          50: '#f9f6f0',
          100: '#ede2d0',
          200: '#e4d4b9',
          300: '#d8c198',
          400: '#d1b585',
          500: '#c5a266',
          600: '#b3935d',
          700: '#8c7348',
          800: '#6c5938',
          900: '#03156B',
        },
      },
      spacing: {
        'xl-8': '32rem',
        'xl-9': '36rem',
      },
      width: {
        'xl-8': '32rem',
        'xl-9': '36rem',
      },
    },
  },
  plugins: [],
};
