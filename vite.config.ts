import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Modern browsers only — smaller output, no legacy transpilation.
    target: 'es2020',

    // Inline assets under 4 KB as base64 (saves a request for small SVGs/icons).
    assetsInlineLimit: 4096,

    // Warn if any single chunk exceeds 500 KB.
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Split vendor code so a content change doesn't invalidate the whole
        // cached bundle for returning visitors. React + Router are on every
        // page; Firebase is only needed on /contact and /register, so keeping
        // it separate keeps ~180 KB off the homepage's critical path.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'router'
          if (id.includes('/react/') || id.includes('react-dom')) return 'react'
          if (id.includes('@firebase') || id.includes('/firebase/')) return 'firebase'
        },
      },
    },
  },
})