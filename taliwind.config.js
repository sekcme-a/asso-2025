/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#C7D4F5",
          200: "#9DB3EC",
          300: "#6B8CDC",
          400: "#3D68CC",
          500: "#1A4BB5",
          600: "#103A97",
          700: "#082B7A",
          800: "#031D5E",
          900: "#010E3A",
        },
        gold: {
          400: "#D4A832",
          500: "#B8921A",
          600: "#9A7A0A",
        },
        sport: {
          red: "#C0392B",
          green: "#16A34A",
          navy: "#0F2A5E",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-nanum)",
          "Pretendard",
          "-apple-system",
          "system-ui",
          "sans-serif",
        ],
        heading: ["var(--font-noto)", "Noto Serif KR", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(135deg, #0F2A5E 0%, #1A4BB5 50%, #0F2A5E 100%)",
        "section-pattern": "linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
