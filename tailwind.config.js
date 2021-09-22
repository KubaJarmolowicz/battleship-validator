module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "2/1": "2fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
