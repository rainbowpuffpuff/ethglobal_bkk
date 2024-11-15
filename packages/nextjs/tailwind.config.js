/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Use class-based dark mode switching
  theme: {
    extend: {
      colors: {
        bgcolor: "var(--bgcolor)",
        primary: "var(--primary)",
        "primary-content": "var(--primary-content)",
        secondary: "var(--secondary)",
        "secondary-content": "var(--secondary-content)",
        accent: "var(--accent)",
        "accent-content": "var(--accent-content)",
        neutral: "var(--neutral)",
        "neutral-content": "var(--neutral-content)",
        "base-100": "var(--base-100)",
        "base-content": "var(--base-content)",
        info: "var(--info)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      fontFamily: {
        manrope: ["'Manrope'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
