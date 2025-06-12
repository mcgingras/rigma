import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        wobble1: {
          "0%, 100%": {
            transform: "translateY(0%) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(-66%) scale(0.65)",
            opacity: "0.8",
          },
        },
        wobble2: {
          "0%, 100%": {
            transform: "translateY(0%) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(66%) scale(0.65)",
            opacity: "0.8",
          },
        },
        "shiny-text": {
          "0%": { backgroundPosition: "-200% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wobble1: "wobble1 0.8s infinite ease-in-out",
        wobble2: "wobble2 0.8s infinite ease-in-out",
        "shiny-text":
          "shiny-text var(--animation-duration, 3s) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
