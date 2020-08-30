import { addHours } from 'date-fns';
import Product from '../../entities/Product';
import IProductsRepository from '../IProductsRepository';

interface ICreateProductDTO {
  name: string;
  description: string;
}

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    const id = this.products.length + 1;
    const created_at = addHours(Date.now(), 3);
    const updated_at = addHours(Date.now(), 3);

    const newProduct = Object.assign(product, {
      id,
      name,
      description,
      created_at,
      updated_at,
    });

    this.products.push(newProduct);
    return newProduct;
  }

  public async findById(id: number): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    product.updated_at = addHours(Date.now(), 3);

    this.products[findIndex] = product;

    return product;
  }
}

export default FakeProductsRepository;
