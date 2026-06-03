// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Detta döljer deprecation-varningar från externa paket (som Bootstrap)
        silenceDeprecations: ['import', 'global-builtin', 'if-function', 'color-functions'],
      },
    },
  },
})