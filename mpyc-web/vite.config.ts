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
      // '@pyscript/core': 'https://cdn.jsdelivr.net/npm/@pyscript/core'
      '@pyscript/core': './node_modules/@pyscript/core/index.js',

      // '../node_modules/polyscript/esm/index.js': './node_modules/polyscript/esm/index.js',
      // '@pyscript/core/node_modules/polyscript': './node_modules/polyscript',
      // '@pyscript/core/node_modules/polyscript/node_modules/polyscript/esm/index.js': path.resolve(__dirname, './node_modules/polyscript/esm/index.js'),
      // 'polyscript/hooks': './node_modules/polyscript/esm/worker/hooks.js'
    }
  },
  // root: "../",
  base: "/mpyc-test/",
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    rollupOptions: {
      plugins: plugins.concat(
        process.env.NO_MIN ? [nodeResolve()] : [nodeResolve(), terser()],
      ),
      // external: ["src/ts/coi-serviceworker.min.js"],
    }
  },
  optimizeDeps: {
    // include: ['polyscript']
  },
  plugins: [
    // RelativePathPlugin(),
    tsconfigPaths(),
    // dynamicImport({
    //   filter(id) {
    //     // `node_modules` is exclude by default, so we need to include it explicitly
    //     // https://github.com/vite-plugin/vite-plugin-dynamic-import/blob/v1.3.0/src/index.ts#L133-L135
    //     if (id.includes('/node_modules/polyscript')) {
    //       return true
    //     }
    //   }
    // }),
    // topLevelAwait({
    //   // The export name of top-level await promise for each chunk module
    //   promiseExportName: "__tla",
    //   // The function to generate import names of top-level await promise in each chunk module
    //   promiseImportName: i => `__tla_${i}`
    // }),
    // pluginRewriteAll()

    // Rewrite({
    //   rules: [
    //     {
    //       // Test for imports that start with "../node_modules/polyscript"
    //       test: /..\/node_modules\/polyscript/,
    //       rewrite: (_, id) => {
    //         // Replace with the correct path to polyscript
    //         return id.replace(
    //           /..\/node_modules/,
    //           '/node_modules/@pyscript/core/node_modules'
    //         )
    //       }
    //     }
    //   ]
    // })
  ],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Accept-Ranges": "bytes"
    },
    fs: {
      allow: ["../../"]
    }
  }
})
