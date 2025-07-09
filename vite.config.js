// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),tailwindcss(),],
//   // optimizeDeps: {
//   // include:['jwt-decode'],
//   // },
//   esbuild: {
//     loader: 'jsx',
//     include: /src\/.*\.(js|jsx)$/,
//   },
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     strictPort: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // 🔁 maps /api/* → /api/v1/*
//       },
//     },
//   },
  
// })


// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(js|jsx)$/,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['speedauto.local', 'luxride.local'], // ✅ allow custom subdomains
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // 🔁 maps /api/* → /api/v1/*
      },
    },
  },
})
