/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    rotate: {
      "y-180": "180deg",
    },
    perspective: {
      1000: "1000px",
    },
    screens: {
      sm: "",

      md: "888px",

      lg: "1200px",
    },
    extend: {},
  },
  plugins: [],
};
