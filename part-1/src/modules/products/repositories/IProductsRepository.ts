import ICreateProductDTO from '../entities/dtos/ICreateProduct';
import Product from '../entities/Product';

export default interface IProductsRepository {
  create({ name, description }: ICreateProductDTO): Promise<Product>;
  findById(id: number): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<Product>;
}
