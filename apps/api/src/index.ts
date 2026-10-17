import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`[Campus Assistant API] Server running on http://localhost:${PORT}`);
  console.log(`[Campus Assistant API] Health check available at http://localhost:${PORT}/health`);
  console.log(`[Campus Assistant API] Content bundle endpoint at http://localhost:${PORT}/api/content`);
});
