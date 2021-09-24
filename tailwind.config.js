module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: {
        DEFAULT: "#29339B",
        light: "#74A4BC",
      },
      white: {
        DEFAULT: "#F8F4E3",
      },
      gray: {
        DEFAULT: "#4C4C47",
      },
      red: {
        DEFAULT: "#FF3A20",
      },
      orange: {
        DEFAULT: "#FC7A1E",
      },
    },
    extend: {
      gridTemplateColumns: {
        "2/1": "2.5fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
