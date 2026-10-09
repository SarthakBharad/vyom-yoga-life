import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: 'es2020',

    assetsInlineLimit: 4096,

    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'router'
          if (id.includes('/react/') || id.includes('react-dom')) return 'react'
          if (id.includes('firestore') || id.includes('app-check') || id.includes('webchannel')) {
            return 'firestore'
          }
          if (id.includes('@firebase') || id.includes('/firebase/')) return 'firebase'
        },
      },
    },
  },
})