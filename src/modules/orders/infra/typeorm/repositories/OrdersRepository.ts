import { EntityRepository, getRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrder } from '@modules/orders/domain/model/IOrder';

@EntityRepository(Order)
export class OrdersRepository implements IOrdersRepository {
    private readonly _ormRepository: Repository<Order>;

    constructor() {
        this._ormRepository = getRepository(Order);
    }

    async findById(id: string): Promise<Order | undefined> {
        const order = this._ormRepository.findOne(id, {
            relations: ['order_products', 'customer'],
        });

        return order;
    }

    async createOrder({
        customer,
        products,
    }: IOrderRepository): Promise<Order> {
        const order = this._ormRepository.create({
            customer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }

    async save(order: IOrder) {
        await this._ormRepository.save(order);
    }
}
