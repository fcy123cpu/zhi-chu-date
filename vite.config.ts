import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 复制sw.js到dist文件夹的插件
const copyServiceWorker: Plugin = {
  name: 'copy-service-worker',
  writeBundle() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const srcSwPath = path.resolve(__dirname, 'sw.js');
    const distSwPath = path.resolve(__dirname, 'dist', 'sw.js');
    
    fs.copyFileSync(srcSwPath, distSwPath);
    console.log('✅ sw.js copied to dist folder');
  }
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), copyServiceWorker],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
