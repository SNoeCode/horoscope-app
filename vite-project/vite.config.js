import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    // Required for Docker
    host: '0.0.0.0',
    port: 5173,
    
    // Enable hot reload in Docker
    watch: {
      usePolling: true,
    },
    
    // Proxy API requests to backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    
    // Optimize for production
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  
  // Preview server configuration (for production testing)
  preview: {
    host: '0.0.0.0',
    port: 4173,
  }
})
