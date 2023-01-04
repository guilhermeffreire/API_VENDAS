import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IBaseProductService } from '@modules/products/domain/models/IBaseProductService';
import { IProduct } from '@modules/products/domain/models/IProduct';

@EntityRepository(Product)
export class ProductRepository implements IProductsRepository {
    private readonly _ormRepository: Repository<Product>;
    constructor() {
        this._ormRepository = getRepository(Product);
    }

    async findByName(name: string): Promise<Product | undefined> {
        const product = this._ormRepository.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    async findAllByIds(products: IBaseProductService[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existsProducts = await this._ormRepository.find({
            where: {
                id: In(productIds),
            },
        });

        return existsProducts;
    }

    async findById(id: string): Promise<Product | undefined> {
        const product = await this._ormRepository.findOne({
            where: {
                id,
            },
        });

        return product;
    }

    async findAll(): Promise<Product[] | undefined> {
        const products = await this._ormRepository.find();

        return products;
    }

    async create({ name, price, quantity }: IProduct): Promise<Product> {
        const product = await this._ormRepository.create({
            name,
            price,
            quantity,
        });

        await this.save(product);

        return product;
    }

    async save(product: IProduct): Promise<void> {
        await this._ormRepository.save(product);
    }

    async remove(product: IProduct): Promise<void> {
        await this._ormRepository.remove(product);
    }
}
