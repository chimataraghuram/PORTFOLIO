import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const imageRoot = path.resolve(__dirname, '../images');
  const imageTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
  };

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    publicDir: 'public',
    plugins: [
      react(),
      {
        name: 'portfolio-image-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (!req.url) return next();

            const requestPath = decodeURIComponent(req.url.split('?')[0]);
            const filePath = path.resolve(imageRoot, `.${requestPath}`);

            if (!filePath.startsWith(imageRoot) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
              return next();
            }

            const type = imageTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
            res.setHeader('Content-Type', type);
            fs.createReadStream(filePath).pipe(res);
          });
        },
        closeBundle() {
          const outputRoot = path.resolve(__dirname, 'dist');
          if (fs.existsSync(imageRoot)) {
            fs.cpSync(imageRoot, outputRoot, { recursive: true, force: true });
          }
        },
      },
    ],
    base: '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  };
});
