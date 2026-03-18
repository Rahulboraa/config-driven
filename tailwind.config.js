/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Geist'", "'Inter'", "system-ui", "sans-serif"],
        mono: ["'Geist Mono'", "'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          500: "#4f6ef7",
          600: "#3b5bf0",
          700: "#2d4de0",
        },
      },
      boxShadow: {
        input: "0 0 0 3px rgba(79,110,247,0.12)",
        card: "0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
