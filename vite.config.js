const vue = require('@vitejs/plugin-vue')

/** @type {import('vite').UserConfig} */
module.exports = {
  plugins: [vue()],
  ssr: {
    format: 'cjs',  // Use CommonJS format for SSR
    target: 'node'  // Target Node.js environment
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: './src/vue/entry-server.js',
      output: {
        format: 'cjs'
      }
    }
  },
  optimizeDeps: {
    exclude: ['vue', '@vue/server-renderer']  // Exclude Vue SSR packages from optimization
  }
} 