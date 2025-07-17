/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: "var(--font-geist-sans)",
        mono: "var(--font-geist-mono)",
        anton: "var(--font-anton)", // ✅ Add Anton
      },
    },
  },
  plugins: [],
};
