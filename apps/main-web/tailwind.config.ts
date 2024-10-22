// tailwind config is required for editor support

import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";
const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/app/**/*.tsx",
    "./src/components/**/*.{js,ts,jsx,tsx}", // 추가된 부분
  ],
  presets: [sharedConfig],
};
export default config;
