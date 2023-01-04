import { IProductOrder } from '@modules/orders/domain/model/IProductOrder';

export interface ICreateOrderService {
    customer_id: string;
    products: IProductOrder[];
}
