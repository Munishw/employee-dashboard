import { screens } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {
    screens: {
      xs: "340px",
      ...screens,
      "3xl": "1920px",
    },
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1200px",
        xl: "1300px",
        "2xl": "1400px",
      },
      padding: {
        DEFAULT: "15px",
      },
    },
    extend: {},
  },
  plugins: [],
}

