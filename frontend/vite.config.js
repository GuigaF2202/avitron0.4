import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig(({ mode }) => {
  // Carregar variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Plugin do React
    plugins: [
      react(),
      {
        name: 'copy-static-assets',
        generateBundle() {
          const publicDir = path.resolve(__dirname, 'public')
          const staticFolders = ['images', 'video']

          staticFolders.forEach(folder => {
            const folderPath = path.join(publicDir, folder)
            
            if (fs.existsSync(folderPath)) {
              const files = fs.readdirSync(folderPath)
              
              files.forEach(file => {
                const filePath = path.join(folderPath, file)
                const fileBuffer = fs.readFileSync(filePath)
                
                this.emitFile({
                  type: 'asset',
                  fileName: `${folder}/${file}`,
                  source: fileBuffer
                })
              })
            }
          })

          // Garantir que o favicon esteja na raiz também
          const faviconPath = path.join(publicDir, 'images/favicon.ico')
          if (fs.existsSync(faviconPath)) {
            const faviconBuffer = fs.readFileSync(faviconPath)
            this.emitFile({
              type: 'asset',
              fileName: 'favicon.ico',
              source: faviconBuffer
            })
          }
        }
      }
    ],

    // Configurações do servidor de desenvolvimento
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      
      // Configuração de proxy para API
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },

    // Configurações de preview
    preview: {
      port: 3000,
      host: true
    },

    // Configurações de build
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      
      // Configurações de minificação
      minify: mode === 'production' ? 'terser' : false,
      
      // Opções de terser para produção
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      
      // Incluir tipos específicos de assets
      assetsInclude: [
        '**/*.svg',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.gif',
        '**/*.webp',
        '**/*.mp4',
        '**/*.ico'
      ],

      // Configurações de rollup
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          // Garantir que os módulos tenham extensão .js
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          
          // Separação de chunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },

    // Resoluções de caminho
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@services': path.resolve(__dirname, './src/services'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@styles': path.resolve(__dirname, './src/styles')
      }
    },

    // Configurações de ambiente
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version),
      'import.meta.env.VITE_APP_NAME': JSON.stringify(process.env.npm_package_name)
    },

    // CSS
    css: {
      preprocessorOptions: {}
    },

    // Configurações de módulos
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: []
    }
  }
})