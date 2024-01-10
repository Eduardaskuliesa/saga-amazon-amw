/* eslint-disable global-require */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        young: ["var(--font-young)", "serif"],
        grafiti: ["var(--font-sedgwick)", "cursive"],
        kalnia: "'Kalnia', serif",
        popins: "'var(--font-poppins)', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        gallery: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      transitionTimingFunction: {
        "in-out-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55);",
      },
    },
  },
  plugins: [],
};
export default config;
