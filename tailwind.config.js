/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: "#0A2F23",
        sidebar: "#0C3C2B",
        cardBg: "#133C29",
        blueCard: "#6BC2F4",
        purpleCard: "#9C6BFF",
        redCard: "#F45B69",
        accent: "#1E5D4A",
      },
    },
  },
  plugins: [],
};
