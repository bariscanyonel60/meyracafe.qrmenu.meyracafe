import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        meyra: {
          bg: "#FFFFFF",
          text: "#193357",
          muted: "#977958",
          border: "#E3D4BB",
          sage: "#BC9D77",
          "sage-light": "#FAF7F2",
          copper: "#BC9D77",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(25, 51, 87, 0.06)",
        card: "0 2px 12px rgba(25, 51, 87, 0.04)",
        modal: "0 10px 30px rgba(25, 51, 87, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
