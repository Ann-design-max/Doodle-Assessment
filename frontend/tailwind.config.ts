import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF7865",
          50: "#FFF2EF",
          100: "#FFD9D2",
          200: "#FFB5A8",
          300: "#FF927E",
          400: "#FF7865",
          500: "#FF7865",
          600: "#E55F4C",
          700: "#C94A36",
        },
        secondary: {
          DEFAULT: "#1C8FCA",
          50: "#E8F5FC",
          100: "#D0ECFA",
          200: "#A7D9F2",
          300: "#6EC3E8",
          400: "#3EAFDF",
          500: "#1C8FCA",
          600: "#15739E",
          700: "#115D80",
        },
        accent: {
          DEFAULT: "#FEF4C0",
          50: "#FFFCED",
          100: "#FEF4C0",
          200: "#FCEB8F",
          300: "#F9DE5A",
          400: "#F5CB2E",
          500: "#E8B91A",
        },
        black: "#4A4A4A",
        white: "#FFFFFF",
      },
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.1" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05" }],
        title: ["1.5rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.5" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
        label: ["0.75rem", { lineHeight: "1.3" }],
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
