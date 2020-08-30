import Product from '../entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface Request {
  name: string;
  description: string;
}

class CreateProductsService {
  constructor(private productRepository: IProductsRepository) {}

  public async execute({ name, description }: Request): Promise<Product> {
    const product = this.productRepository.create({
      name,
      description,
    });

    return product;
  }
}

export default CreateProductsService;
