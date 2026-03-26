import path from "node:path";
import { fileURLToPath } from "node:url";

// Monorepo: dev server cwd may be the repo parent; Tailwind must resolve from this app.
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: appRoot,
    },
  },
};

export default config;
