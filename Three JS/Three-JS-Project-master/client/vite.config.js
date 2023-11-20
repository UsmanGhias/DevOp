import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add this line to serve the assets folder
    serve: {
      open: true,
      cors: true,
    },
  },
  optimizeDeps: {
    include: ['three'],
  },
})
