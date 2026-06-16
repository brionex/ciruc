import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss()],
  base: command === 'build' ? '/ciruc/' : '/',
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
