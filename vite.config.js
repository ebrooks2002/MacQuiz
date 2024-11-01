import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/MacQuiz/' : '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/MacQuiz/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
