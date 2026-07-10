import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    name: 'Zara Phone Catalog BFF',
    version: '1.0.0',
    status: 'up',
    endpoints: {
      health: '/health',
      products: '/api/products',
    },
  });
});

/**
 * GET /health — Health check endpoint
 */
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export { router as healthRouter };
