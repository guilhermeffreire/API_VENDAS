import { IProduct } from '@modules/products/domain/models/IProduct';
import { IBaseProductService } from '@modules/products/domain/models/IBaseProductService';
import { ICreateProductService } from '@modules/products/domain/models/ICreateProductService';

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;

    findAllByIds(products: IBaseProductService[]): Promise<IProduct[]>;

    findById(id: string): Promise<IProduct | undefined>;

    findAll(): Promise<IProduct[] | undefined>;

    create({ name, price, quantity }: ICreateProductService): Promise<IProduct>;

    save(product: IProduct): Promise<void>;

    remove(product: IProduct): Promise<void>;
}
