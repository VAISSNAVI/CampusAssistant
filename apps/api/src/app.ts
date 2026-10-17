import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

export function createApp() {
  const app = express();

  // Configure CORS
  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
    : ['http://localhost:3001', 'http://localhost:5173', 'http://localhost:8081'];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow mobile apps, curl, or matched origins
        if (!origin || corsOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
          callback(null, true);
        } else {
          callback(null, true); // Dev permissive
        }
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      service: 'Campus Assistant API (KRCE)',
      timestamp: new Date().toISOString(),
    });
  });

  // Mount API router
  app.use('/api', routes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
