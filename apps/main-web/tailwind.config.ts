import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<
  Config,
  "content" | "presets" | "darkMode" | "plugins" | "theme"
> = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.{js,ts,jsx,tsx}", // 추가된 부분
  ],
  presets: [sharedConfig],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        lookids: {
          DEFAULT: "#FD9340",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
};
export default config;
// tailwind config is required for editor suppo rt

// import type { Config } from "tailwindcss";
// import sharedConfig from "@repo/tailwind-config";

// const config: Pick<Config, "content" | "presets"> = {
//   content: ["./src/app/**/*.tsx"],
//   presets: [sharedConfig],
// };

// export default config;
