import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: null | number;
    next_page: null | number;
    data: Customer[];
}
