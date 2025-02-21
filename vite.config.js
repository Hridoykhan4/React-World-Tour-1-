import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.0.15', // Replace with your IP
    port: 5173, // Optional: You can specify a different port if needed. 5173 is Vite's default.
    hmr: { // Hot Module Reloading for Mobile
      clientPort: 5173, // Or whatever port you use
    },
  },
})
