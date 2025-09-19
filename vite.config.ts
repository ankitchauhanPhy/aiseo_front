// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'
// import path from "path"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),  tailwindcss(),],
//    resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
 
// https://vite.dev/config/
export default defineConfig({
  base: '/aiseo',
  plugins: [react(),tailwindcss()],
  server: {
    port: 8181,
    host: true, // allows external connections
    allowedHosts: [
      'beta-genie.pharynxai.in',
      'localhost',
      '127.0.0.1'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  }
})
