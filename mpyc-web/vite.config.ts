import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 'polyscript/hooks': './node_modules/polyscript/esm/worker/hooks.js'
    }
  },
  // root: "../",
  base: "/mpyc-test/",
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      // external: ["src/ts/coi-serviceworker.min.js"],
    }
  },
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
