import type {Config} from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#1B2A4A",
        accent: "#E8483A",
        ink: "#111114",
        "neutral-soft": "#F7F5F2",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
};

export default config;
