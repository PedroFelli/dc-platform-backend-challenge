import ProductRepository from '../../src/modules/products/repositories/fakes/ProductsRepository';
import UpdateProductsService from '../../src/modules/products/services/UpdateProductsService';
import CreateProductsService from '../../src/modules/products/services/CreateProductsService';
import FakeCacheProvider from '../../src/shared/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '../../src/errors/AppError';

describe('Update Product', () => {
  it('shoud be able to update product information', async () => {
    const productRepository = new ProductRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const updateProduct = new UpdateProductsService(
      productRepository,
      fakeCacheProvider,
    );

    const createProductService = new CreateProductsService(productRepository);

    await createProductService.execute({
      name: 'cadeira',
      description: 'escritorio',
    });

    const product = await updateProduct.execute({
      id: 1,
      name: 'mesa',
      description: 'escritorio',
    });

    expect(product.name).toEqual('mesa');
    expect(product.description).toEqual('escritorio');
  });

  it('shoud not be able to update a product who does not exist', async () => {
    const productRepository = new ProductRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const updateProduct = new UpdateProductsService(
      productRepository,
      fakeCacheProvider,
    );

    const createProductService = new CreateProductsService(productRepository);

    await createProductService.execute({
      name: 'cadeira',
      description: 'escritorio',
    });

    await expect(
      updateProduct.execute({
        id: 2,
        name: 'mesa',
        description: 'escritorio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update product information with same information in lass than 10 min', async () => {
    const productRepository = new ProductRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const updateProduct = new UpdateProductsService(
      productRepository,
      fakeCacheProvider,
    );

    const createProductService = new CreateProductsService(productRepository);

    await createProductService.execute({
      name: 'cadeira',
      description: 'escritorio',
    });

    await updateProduct.execute({
      id: 1,
      name: 'mesa',
      description: 'escritorio',
    });

    await expect(
      updateProduct.execute({
        id: 1,
        name: 'mesa',
        description: 'escritorio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
