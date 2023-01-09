import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class ListProductsService {
    constructor(
        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}
    async execute(): Promise<IProduct[] | undefined> {
        const redisCache = new RedisCache();

        let products = await redisCache.recover<IProduct[] | undefined>(
            'api-vendas-PRODUCTS_LIST',
        );

        if (!products) {
            products = await this._productsRepository.findAll();

            await redisCache.save('api-vendas-PRODUCTS_LIST', products);
        }

        return products;
    }
}

export default ListProductsService;
