import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { resolve } from "path";
const currentDir = process.cwd();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: "",
          filePattern: "**/index.tsx",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(currentDir, "src"),
    },
  },
});
