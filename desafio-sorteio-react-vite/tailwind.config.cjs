/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#262A34",
        primary: "#EF6C00",
        success: "#32BF00",
        danger: "#CC3300",
      },
    },
    fontFamily: {
      mono: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
