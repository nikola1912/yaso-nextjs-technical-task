import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.indigo[300], // Light shade of Tailwind's Indigo
          DEFAULT: colors.indigo[500], // Default Tailwind Indigo
          dark: colors.indigo[900], // Dark shade of Tailwind's Indigo
        },
        background: {
          DEFAULT: colors.slate[900], // Dark background color
          card: colors.slate[800], // Slightly lighter for cards
        },
        text: {
          light: colors.gray[400], // Light gray for secondary text
          primary: colors.white, // White for primary text
        },
      },
    },
  },
  plugins: [],
};
export default config;
