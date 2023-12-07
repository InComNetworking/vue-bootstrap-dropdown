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


function camelize(str) {
  let arr = str.split("-");
  let capital = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return capital.join("");
}

let packageExportName = camelize("vue-bootstrap-dropdown");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: mapSettings.alias,
  },
  build: {
    lib: {
      entry: "./index.js",
      name: packageExportName,
      // the proper extensions will be added
      fileName: "vue-bootstrap-dropdown",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
