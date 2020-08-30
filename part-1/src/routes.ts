import { Router } from 'express';

import ProductController from './modules/products/controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.get('/', (_, res) => {
  res.json({
    msg: 'Welcome to API ',
  });
});

router.post('/products', productController.create);
router.put('/products/', productController.update);

export default router;
