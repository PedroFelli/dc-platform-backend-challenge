import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';
import ICreateProductDTO from '../entities/dtos/ICreateProduct';
import IProductsRepository from './IProductsRepository';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, description });

    await this.ormRepository.save(product);

    return product;
  }

  public async findById(id: number): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
