import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";

const addVariants: PluginCreator = ({ addVariant }) => {
  addVariant("svg", "& > svg");
  addVariant("svg_*", "& > svg *");

  addVariant("path", "& > path");
  addVariant("path_*", "& > path *");
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gradientColorStopPositions: {
        "200%": "200%",
      },
      colors: {
        base: {
          1: "#adffb0",
          2: "#17282d",
        },
      },
      dropShadow: {
        "lg-t": "0 -0.5rem 1rem var(--tw-shadow-color)",
        "lg-b": "0 0.5rem 1rem var(--tw-shadow-color)",
        "lg-l": "-0.5rem 0 1rem var(--tw-shadow-color)",
        "lg-r": "0.5rem 0 1rem var(--tw-shadow-color)",
        "lg-c": "0 0 1rem var(--tw-shadow-color)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "screen-1/2": "50vh",
        "screen-1/3": "33vh",
        "screen-2/3": "66vh",
        "screen-1/4": "25vh",
        "screen-2/4": "50vh",
        "screen-3/4": "75vh",
        "screen-1/5": "20vh",
        "screen-2/5": "40vh",
        "screen-3/5": "60vh",
        "screen-4/5": "80vh",
      },
    },
  },
  plugins: [addVariants],
};
export default config;
