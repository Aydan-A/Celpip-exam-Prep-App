import './server/env.js';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only middleware so `npm run dev` serves the /api/feedback endpoint
// (in production, server/index.js handles it via Express).
function apiPlugin() {
  return {
    name: 'celpip-api',
    configureServer(server) {
      server.middlewares.use('/api/feedback', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }
        let raw = '';
        req.on('data', (chunk) => (raw += chunk));
        req.on('end', async () => {
          const { feedbackRoute } = await import('./server/feedback.js');
          let body = {};
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch {
            body = {};
          }
          feedbackRoute({ body }, res);
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: { port: 5173 },
});
