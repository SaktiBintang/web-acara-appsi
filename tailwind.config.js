/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B2A59",
        appsi: {
          blue: "#0E4DA4",
          blue2: "#1D63DC",
          gold: "#D97706",
          red: "#DC2626",
          soft: "#F4F7FB",
        },
      },
    },
  },
  plugins: [],
};