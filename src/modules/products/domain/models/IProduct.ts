import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    order_products: OrdersProducts[];
    created_at: Date;
    updated_at: Date;
}
