import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#81C14B",
          secondary: "#84A98C",
          error: "#FF0000",
          grey: "#818181",
          dark: "#31405A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
