/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        red: "#CD5C5C",
        black: "#000",
      },
      outlineColor: {
        outlineRed: "#f8c7c7",
      },
      borderColor: {
        borderGrey: "#ccc",
        borderRed: "#CD5C5C",
        borderLightRed: "#f8c7c7",
      },
      backgroundColor: {
        lightRed: "#f8c7c7",
      },
      colors: {
        white: "#fff",
        lessWhite: "#fefefe",
        border: "#ccc",
        black: "#000",
        red: "#CD5C5C",
        lightRed: "#f8c7c7",
        lightDark: "#a7a7a7",
      },
    },
  },
  plugins: [],
};
