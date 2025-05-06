import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: true, // exposes to network
    port: 8007, // optional
    allowedHosts: ['vaibhavp.hyderabad.cdac.in'],
  },
 
})
