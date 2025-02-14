import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> | false = {
  name: 'UniHelper',
  short_name: 'UniHelper',
  background_color: '#17171c',
  theme_color: '#17171c',
  icons: [
    {
      purpose: 'maskable',
      sizes: '192x192',
      src: 'icon192_maskable.png',
      type: 'image/png'
    },
    {
      purpose: 'any',
      sizes: '512x512',
      src: 'icon512_rounded.png',
      type: 'image/png'
    }
  ],
  orientation: 'any',
  display: 'standalone',
  lang: 'ru-RU',
  start_url: '/'
};

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        mode: 'production',
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webmanifest}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10 }
            }
          },
          {
            urlPattern: /\.(?:html|js|css|json)$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'core-assets',
              networkTimeoutSeconds: 3
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      manifest: manifest
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
