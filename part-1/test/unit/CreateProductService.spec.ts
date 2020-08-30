import ProductRepository from '../../src/modules/products/repositories/fakes/ProductsRepository';
import CreateProductsService from '../../src/modules/products/services/CreateProductsService';

describe('Create Product', () => {
  it('shoud be able to create a new product', async () => {
    const productRepository = new ProductRepository();
    const createProductService = new CreateProductsService(productRepository);

    const product = await createProductService.execute({
      name: 'cadeira',
      description: 'escritorio',
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toEqual('cadeira');
  });
});
