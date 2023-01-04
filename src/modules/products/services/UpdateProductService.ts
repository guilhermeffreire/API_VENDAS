import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IUpdateProductService } from '@modules/products/domain/models/IUpdateProductService';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}

    public async execute({
        id,
        name,
        price,
        quantity,
    }: IUpdateProductService): Promise<IProduct | undefined> {
        const product = await this._productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        const productExists = await this._productsRepository.findByName(name);

        if (productExists && name != product.name) {
            throw new AppError('There is already one product with this name');
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await this._productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
