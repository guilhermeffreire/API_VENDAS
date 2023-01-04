import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { ICreateProductService } from '@modules/products/domain/models/ICreateProductService';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}
    async execute({
        name,
        quantity,
        price,
    }: ICreateProductService): Promise<IProduct> {
        const productExists = await this._productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        const redisCache = new RedisCache();

        const newProduct = await this._productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await this._productsRepository.save(newProduct);

        return newProduct;
    }
}

export default CreateProductService;
