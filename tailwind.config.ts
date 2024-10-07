import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2FFF',
        secondary: '#f5f8fe',
        dark: '#171b20',
        qborder: '#d3d5e6',
        navbar: '#ebecf5',
        options: '#67db86',
      },
    },
  },
  plugins: [],
};
export default config;
