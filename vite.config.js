import { fileURLToPath, URL } from 'node:url'
import path from "path"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src")
    }
  },
  optimizeDeps:{
    includs:['jquery']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
