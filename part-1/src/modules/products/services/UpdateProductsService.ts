import { differenceInMinutes, subHours } from 'date-fns';

import Product from '../entities/Product';
import AppError from '../../../errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import ICacheProvider from '../../../shared/providers/CacheProvider/models/ICacheProvider';

interface Request {
  id: number;
  name: string;
  description: string;
}

class UpdateProductsService {
  constructor(
    private productRepository: IProductsRepository,
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, name, description }: Request): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const dataValue = JSON.stringify({ id, name, description });

    // check the difference in minutes
    const difInMinutes = differenceInMinutes(
      new Date(),
      subHours(product.updated_at, 3),
    );

    // if the difference is less than 10 minutes
    if (difInMinutes < 10) {
      const cacheData = await this.cacheProvider.recover(
        `product-${product.id}`,
      );

      // if the body data is equal the last
      if (cacheData === dataValue) {
        throw new AppError('Duplicate request in less than 10 min', 403);
      }
    }

    // if is not equal salve the lasty body request and update the product

    await this.cacheProvider.invalidate(`product-${product.id}`);

    await this.cacheProvider.save(`product-${product.id}`, `${dataValue}`);

    product.name = name;
    product.description = description;

    const newProduct = await this.productRepository.save(product);

    return newProduct;
  }
}

export default UpdateProductsService;
