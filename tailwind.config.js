/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fff',
        gray: {
          50: '#f9fafb',
          100: '#f7fafc',
          200: '#edf2f7',
          300:'#d1d5db',
          400:'#9ca3af',
          500:'#6b7280',
          600:'#4b5563',
          700:'#374151',
          800:'#1f2937',
          900: '#1a202c',
          950:'#030712',
        },
        sky:{
          500:'#0ea5e9'
        },
        pink:{
          500:'#ec4899',
        },
        blue:{
          300: '#93c5fd'
        },
        cyan:{
          700: '#0e7490',
          950: '#083344',
        },
        // Add your custom colors here...
        // primary: '#ff0000',
        // secondary: '#00ff00',
        lightB: '#00D5FA',
      },
      extend: {
      },
  },
  plugins: [
    import ('flowbite/plugin')
]
}