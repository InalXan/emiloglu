/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    backgroundImage: {
      // home
      homeImage: "url('@/assets/img/home.jpeg')",
      // about
      aboutHeader: "url('../assets/img/logo.jpg')",
      aboutLeft: "url('../assets/img/iron-texture-3.jpg')",
      aboutMessage: 'url(../assets/img/iron-texture-3.jpg)',
    },
    extend: {
      colors: {
        primary: '#ff9200',
        second: '#fff',
        thirty: '#EEEEEE',
        danger: 'crimson',
        success: 'green',
      },
    },
  },
  plugins: [],
}
