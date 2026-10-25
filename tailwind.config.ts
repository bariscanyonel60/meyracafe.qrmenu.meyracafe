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
        meyra: {
          bg: "#FFFFFF",
          card: "#FFFFFF",
          text: "#193357",
          muted: "#977958",
          border: "#E3D4BB",
          sage: "#BC9D77",
          "sage-light": "#FAF7F2",
          copper: "#BC9D77",
          "copper-dark": "#977958",
          navy: "#193357",
          beige: "#BC9D77",
          cream: "#E3D4BB",
          bronze: "#977958",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
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
