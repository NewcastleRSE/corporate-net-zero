/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.orange,
        transparent: "transparent",
        current: "currentColor",
        amber: colors.amber,
        black: colors.black,
        blue: colors.blue,
        cyan: colors.cyan,
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        gray: colors.neutral,
        blueGray: colors.slate,
        coolGray: colors.gray,
        trueGray: colors.neutral,
        warmGray: colors.slate,
        green: colors.green,
        indigo: colors.indigo,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,
        purple: colors.purple,
        red: colors.red,
        rose: colors.rose,
        sky: colors.sky,
        teal: colors.teal,
        violet: colors.violet,
        yellow: colors.amber,
        white: colors.white,
    },
  },
},
safelist: [
  'primary',
  'secondary',
  'accent',
],
  plugins: [],
}

