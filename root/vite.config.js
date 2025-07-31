// vite.config.js
import { defineConfig } from 'vite';
// ✅ پکیج صحیح را import کنید
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import ViteRestart from 'vite-plugin-restart';

// __dirname را برای سازگاری با ES Modules تعریف می‌کنیم
const __dirname = resolve();

export default defineConfig({
  root: 'src',
  plugins: [
    // ✅ پلاگین را اینجا فراخوانی کنید
    tailwindcss(),
    ViteRestart({
      restart: [
        'src/assets/**/**/*',
        'src/pages/**/**/*',
        'src/partials/**/**/*',
      ],
    }),
  ],
  
  // ✅ این بخش جدید برای حل مشکل ارورها اضافه شده است
  optimizeDeps: {
    exclude: ['alpinejs', 'swiper'],
  },

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        // ... بقیه صفحات
      }
    }
  }
});
