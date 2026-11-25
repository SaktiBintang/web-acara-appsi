/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        appsi: { blue: "#1D4ED8", blue2: "#0066CC", red: "#DC2626", soft: "#F8FAFC" },
      },
    },
  },
  plugins: [],
};
