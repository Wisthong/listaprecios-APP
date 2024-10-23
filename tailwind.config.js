/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        passion: ["Passion One", "cursive"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        title: "#213665",
        amarillo_universal: "#fabc0b",
        azul_universal: "#1e429f",
        azul_universal_1: "#1197d4",
        azul_universal_2: "#1285ad",
      },
    },
  },
};
