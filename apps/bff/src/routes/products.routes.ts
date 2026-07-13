import { Router } from 'express';

import { proxyRequest } from '../services/proxy.service';

const router = Router();

/**
 * GET /api/products — List products with optional search, limit, offset
 */
router.get('/products', async (req, res) => {
  const { search, limit, offset } = req.query;

  const params = new URLSearchParams();
  if (typeof search === 'string' && search.length > 0) params.set('search', search);
  if (typeof limit === 'string') params.set('limit', limit);
  if (typeof offset === 'string') params.set('offset', offset);

  const queryString = params.toString();
  const path = `/products${queryString ? `?${queryString}` : ''}`;

  const result = await proxyRequest({ path });

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});

/**
 * GET /api/products/:id — Product detail
 */
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await proxyRequest({ path: `/products/${id}` });

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  res.json(result.data);
});

export { router as productsRouter };
