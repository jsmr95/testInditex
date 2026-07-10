import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { healthRouter } from './routes/health.routes';
import { productsRouter } from './routes/products.routes';

const app = express();

// Middleware
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/', healthRouter);
app.use('/api', productsRouter);

// Error handling
app.use(errorHandler);

// Start
app.listen(env.PORT, () => {
  if (env.NODE_ENV === 'development') {
    console.info(`[BFF] Running on http://localhost:${env.PORT}`);
    console.info(`[BFF] Proxying to ${env.UPSTREAM_API_URL}`);
  }
});

export { app };
