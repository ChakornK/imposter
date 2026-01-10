import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ViteYaml(), vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
