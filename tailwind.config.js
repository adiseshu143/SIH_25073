/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FFC107",
        cream: "#FFFBEA",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.07)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};


