import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    name: string;
    quantity: number;
    price: number;
}

class CreateProductService {
    public async execute({
        name,
        quantity,
        price,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        const redisCache = new RedisCache();

        const newProduct = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

        await productsRepository.save(newProduct);

        return newProduct;
    }
}

export default CreateProductService;
