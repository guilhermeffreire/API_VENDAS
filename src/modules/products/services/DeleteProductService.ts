import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IBaseProductService } from '@modules/products/domain/models/IBaseProductService';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}
    async execute({ id }: IBaseProductService): Promise<void> {
        const product = await this._productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await this._productsRepository.remove(product);
    }
}

export default DeleteProductService;
