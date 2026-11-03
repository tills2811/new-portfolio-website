/** @type {import('tailwindcss').Config} */
const token = (name) => `var(--${name})`;

module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: token("page"),
        ink: token("ink"),
        "ink-2": token("ink-2"),
        muted: token("muted"),
        hair: token("hair"),
        tomato: token("tomato"),
        lilac: token("lilac"),
        butter: token("butter"),
        pine: token("pine"),
        sky: token("sky"),
        blush: token("blush"),
        "on-pine": token("on-pine"),
      },
    },
  },
  plugins: [],
};
