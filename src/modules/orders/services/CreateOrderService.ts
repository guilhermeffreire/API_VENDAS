import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { ICreateOrderService } from '@modules/orders/domain/model/ICreateOrderService';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IOrder } from '@modules/orders/domain/model/IOrder';

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository') private _orderRepository: IOrdersRepository,
        @inject('CustomersRepository')
        private _customersRepository: ICustomersRepository,

        @inject('ProductRepository')
        private _productsRepository: IProductsRepository,
    ) {}
    async execute({
        customer_id,
        products,
    }: ICreateOrderService): Promise<IOrder> {
        const customerExists = await this._customersRepository.findByID(
            customer_id,
        );

        if (!customerExists) {
            throw new AppError(
                'Could not find any customer with the given id.',
            );
        }

        const existsProducts = await this._productsRepository.findAllByIds(
            products,
        );

        if (!existsProducts.length) {
            throw new AppError(
                'Could not find any products with the given ids.',
            );
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkNoExistentProduct = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkNoExistentProduct.length) {
            throw new AppError(
                `Could not find product ${checkNoExistentProduct[0].id}.`,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price,
        }));

        const order = await this._orderRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                existsProducts.filter(p => p.id === product.product_id)[0]
                    .quantity - product.quantity,
        }));

        await this._productsRepository.save(updatedProductQuantity);

        return order;
    }
}

export default CreateOrderService;
