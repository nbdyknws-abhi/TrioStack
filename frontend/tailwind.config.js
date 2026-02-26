/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cyber Teal + Matte Black
        cyber: {
          teal: "#00f2ff",
          black: "#0a0a0a",
          darker: "#050505",
          light: "#e0faff",
        },
        // Neon Amber + Deep Navy
        neon: {
          amber: "#ffb300",
          navy: "#001f3f",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
