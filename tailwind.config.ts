import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A2E6D",
        green: {
          foundation: "#5A8F2D",
          light: "#6aa333",
        },
        gold: "#F2B233",
        "secondary-bg": "#F8FAFC",
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
