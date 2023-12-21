/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./front/pages/*.html",
    "./front/templates/*.html",
    "./front/script/*.js",
    "./front/index.html",
    "./libs/*.js",
  ],
  theme: {
    extend: {
      colors: {
        cookiz: {
          bg: "#F2F2F2",
          margin: "#BF5672",
          tile: "#6C6AA6",
          row: "#9593BF",
          line: "#A8A9BF",
          text: "#ffffff",
        },
      },
      fontFamily: {
        openSans: ["OpenSans-Regular", "sans-serif"],
        FjallaOne: ["FjallaOne", "serif"],
        Inter: ["Inter", "sans-serif"],
        InterBold: ["Inter-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}
