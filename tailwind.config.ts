import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          light: "hsl(93, 49%, 95%)",
          lighter: "#EFF7E7",
          lightest: "#F9FCF7",
          DEFAULT: "hsl(93, 49%, 53%)",
          secondary: "#84A98C",
          dark: "#2C2B34",
        },
        error: {
          lighter: "#FFFAF5",
          light: "#FEF0E2",
          DEFAULT: "#FF0000",
        },
        orange: {
          DEFAULT: "#F28B24"
        },
        grey: {
          lighter: "#F9F9F9",
          light: "hsl(0, 0%, 95%)",
          DEFAULT: "hsl(0, 0%, 51%)",
          dark: "#CAD2C5",
          darker: "#D9D9D9"
        },
        dark: "#31405A",
      },
    },
  },
  plugins: [],
};
export default config;
