// Production server: serves the built app from dist/.
import './env.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = express();

const dist = path.join(root, 'dist');
app.use(express.static(dist));
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`CELPIP Prep running at http://localhost:${port}`);
});
