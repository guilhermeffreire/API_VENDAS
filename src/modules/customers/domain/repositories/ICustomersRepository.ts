import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import IPaginateCustomer from '@modules/customers/domain/models/IPaginateCustomer';

export interface ICustomersRepository {
    findByName(name: string): Promise<ICustomer | undefined>;

    findByID(id: string): Promise<ICustomer | undefined>;

    findByEmail(email: string): Promise<ICustomer | undefined>;

    create(data: ICreateCustomer): Promise<ICustomer>;

    save(customer: Customer): Promise<void>;

    remove(customer: Customer): Promise<void>;

    listAllCostumers(): Promise<IPaginateCustomer>;
}
