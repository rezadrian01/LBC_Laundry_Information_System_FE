import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@layouts": path.resolve(__dirname, "src/components/Layouts"),
      "@mods": path.resolve(__dirname, "src/components/Modules"),
    }
  },
  server: {
    host: '0.0.0.0',
  },
  // base: "/lbclaundry/",
})
