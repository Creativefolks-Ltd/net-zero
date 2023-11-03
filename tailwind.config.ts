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
          DEFAULT: "hsl(93, 49%, 53%)",
          secondary: "#84A98C",
        },
        error: "#FF0000",
        grey: {
          light: "hsl(0, 0%, 95%)",
          DEFAULT: "hsl(0, 0%, 51%)",
        },
        dark: "#31405A",
      },
    },
  },
  plugins: [],
};
export default config;
