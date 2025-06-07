import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/user' : 'https://cryptotrack-wuf2.onrender.com',
    }
  },
  plugins: [react()],
})
