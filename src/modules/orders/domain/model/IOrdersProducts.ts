import { IProduct } from '@modules/products/domain/models/IProduct';
import { IOrder } from '@modules/orders/domain/model/IOrder';

export interface IOrdersProducts {
    id: string;
    order: IOrder;
    product: IProduct;
    price: number;
    quantity: number;
    order_id: string;
    product_id: string;
    created_at: Date;
    updated_at: Date;
}
