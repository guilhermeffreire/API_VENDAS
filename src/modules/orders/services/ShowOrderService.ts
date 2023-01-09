import AppError from '../../../shared/errors/AppError';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { IShowOrderService } from '@modules/orders/domain/model/IShowOrderService';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IOrder } from '@modules/orders/domain/model/IOrder';

@injectable()
class ShowOrderService {
    constructor(
        @inject('OrdersRepository')
        private _ordersRepository: IOrdersRepository,
    ) {}
    async execute({ id }: IShowOrderService): Promise<IOrder> {
        const order = await this._ordersRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found');
        }

        return order;
    }
}

export default ShowOrderService;
