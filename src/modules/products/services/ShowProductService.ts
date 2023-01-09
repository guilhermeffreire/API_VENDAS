import AppError from '@shared/errors/AppError';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IBaseProductService } from '@modules/products/domain/models/IBaseProductService';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}
    async execute({ id }: IBaseProductService): Promise<IProduct> {
        const product = await this._productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowProductService;
