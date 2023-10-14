import { defineConfig, PluginOption, loadEnv } from 'vite'
import git from 'git-rev-sync'
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        // "@pyscript/core": "https://cdn.jsdelivr.net/npm/@pyscript/core@0.2.8/index.js",
        // '@pyscript/core': './node_modules/@pyscript/core/index.js',
      }
    },
    define: {
      "__BUILD_INFO__": { version: env.npm_package_version, dirty: git.isDirty(), deployment: env.APP_DEPLOYMENT, timestamp: Date.now(), time: new Date().toLocaleString("en-IE", { hour12: false }), revision: git.short("./") },
    },
    root: "./mpyc-web/",
    publicDir: "./public",
    base: "./",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      target: 'esnext',
      rollupOptions: {
        // external: ['@pyscript/core'],
      }
    },
    cacheDir: "../.vite",
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
      fs: {
        // allow: [
        //   "mpyc-web/", // and your source files
        //   "src/", // and your source files
        // ],
      }
    }
  }
})
