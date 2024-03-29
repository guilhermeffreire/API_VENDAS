import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';
import { container, injectable } from 'tsyringe';

@injectable()
export default class OrdersController {
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrder = container.resolve(ShowOrderService);

        const order = await showOrder.execute({ id });

        return response.json(order);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { customer_id, products } = request.body;

        const createOrder = container.resolve(CreateOrderService);

        const order = await createOrder.execute({
            customer_id,
            products,
        });

        return response.json(order);
    }
}
