import { ICustomer } from '@modules/customers/domain/models/ICustomer';

interface IProductOrder {
    product_id: string;
    price: number;
    quantity: number;
}

export interface IOrderRepository {
    customer: ICustomer;
    products: IProductOrder[];
}
