import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
import vue from "@vitejs/plugin-vue";

var mapSettings = {
  outDir: "dist",
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
    "#": fileURLToPath(new URL("./node_modules", import.meta.url)),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: mapSettings.alias,
  },
  build: {
    outDir: mapSettings.outDir,
    rollupOptions: {
      plugins: [
        commonjs(),
        externalGlobals({
          vue: "Vue",
        }),
      ],
      output: {
        format: "es",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
