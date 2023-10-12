import { defineConfig, PluginOption } from 'vite'
// import { nodeResolve } from "@rollup/plugin-node-resolve";
// import terser from "@rollup/plugin-terser";
// import pluginRewriteAll from 'vite-plugin-rewrite-all';
// import tsconfigPaths from 'vite-tsconfig-paths'
import topLevelAwait from "vite-plugin-top-level-await";
// import dynamicImport from 'vite-plugin-dynamic-import'
import externalize from "vite-plugin-externalize-dependencies";

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
      // "@pyscript/core": "https://cdn.jsdelivr.net/npm/@pyscript/core@0.2.8/index.js",

      // '@pyscript/core': './node_modules/@pyscript/core/index.js',
    }
  },
  root: "./mpyc-web/",
  publicDir: "./public",
  base: "./",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    target: 'esnext',
    // assetsInlineLimit: 0,
    rollupOptions: {
      // plugins: plugins.concat(
      //   process.env.NO_MIN ? [nodeResolve()] : [nodeResolve(), terser()],
      // ),

      // external: ['@pyscript/core'],
    }
  },
  cacheDir: "../.vite",
  // cacheDir: ".vite",
  plugins: [
    // tsconfigPaths(),
    // externalize({ externals: ["@pyscript/core", "polyscript"] }),

    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Accept-Ranges": "bytes"
    },
    watch: {
      ignored: [
        '.devenv/**',
        '.direnv/**',
        '.venv/**',
        '.yarn/**',
        'nix',
        'tailscale',
        'mpyc',
        '.vscode',
        'scripts',
      ],
    },

    fs: {
      // allow: [
      //   "mpyc-web/", // and your source files
      //   "src/", // and your source files
      //   "node_modules/"
      // ],


    }
  }
})
