import { Request, Response } from 'express';

import CreateProductsService from '../services/CreateProductsService';
import UpdateProductsService from '../services/UpdateProductsService';
import ProductsRepository from '../repositories/ProductsRepository';

import CacheProvider from '../../../shared/providers/CacheProvider/implementations/RedisCacheProvider';

export default class ProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const productRepository = new ProductsRepository();
    const createProduct = new CreateProductsService(productRepository);

    try {
      const product = await createProduct.execute(data);

      return response.status(201).json(product);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, description } = request.body;

    const productRepository = new ProductsRepository();
    const cacheProvider = new CacheProvider();
    const updateProduct = new UpdateProductsService(
      productRepository,
      cacheProvider,
    );

    try {
      const product = await updateProduct.execute({ name, description, id });

      return response.status(200).json(product);
    } catch (err) {
      return response.status(err.statusCode || 400).json({
        message: err.message || 'Internal sever error!',
      });
    }
  }
}
