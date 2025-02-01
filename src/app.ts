import express from 'express';
import cors from 'cors';
import logRoutes from './routes/log.routes';
import config from './config/env.config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/logs', logRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${process.env.NODE_ENV} mode`);
  });
}

export default app;