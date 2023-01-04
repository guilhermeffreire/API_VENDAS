import { IOrder } from '@modules/orders/domain/model/IOrder';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import { IOrderRepository } from '@modules/orders/domain/repositories/IOrderRepository';

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | undefined>;
    createOrder({ customer, products }: IOrderRepository): Promise<Order>;
}
