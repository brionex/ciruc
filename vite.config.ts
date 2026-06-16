import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss()],
  base: mode === 'production' ? '/ciruc/' : '/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: 'index.html',
        doc: 'doc.html',
      },
    },
  },
}))
