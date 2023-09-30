import { defineConfig, PluginOption } from 'vite'
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import tsconfigPaths from 'vite-tsconfig-paths'
import topLevelAwait from "vite-plugin-top-level-await";
import dynamicImport from 'vite-plugin-dynamic-import'

import path from 'path'

const plugins: PluginOption = [];

// function RelativePathPlugin() {
//   return {
//     name: 'relative-path-plugin',
//     resolveId(source: string) {
//       console.log(source)
//       if (source.startsWith('../node_modules/polyscript')) {
//         return path.resolve(
//           'node_modules/@pyscript/core/node_modules',
//           source.slice('../node_modules/'.length)
//         );
//       }
//     },
//   };
// }


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@pyscript/core': './node_modules/@pyscript/core/index.js',
    }
  },
  base: "/mpyc-test/",
  build: {
    target: 'esnext',
    // assetsInlineLimit: 0,
    // rollupOptions: {
    //   plugins: plugins.concat(
    //     process.env.NO_MIN ? [nodeResolve()] : [nodeResolve(), terser()],
    //   ),
    // }
  },
  plugins: [
    // tsconfigPaths(),
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Accept-Ranges": "bytes"
    },
  }
})
