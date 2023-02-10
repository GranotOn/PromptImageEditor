/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "bg-gr-animate": "BtnBG 4s ease infinite",
      },
      keyframes: {
        BtnBG: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "0%": { "background-position": "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
