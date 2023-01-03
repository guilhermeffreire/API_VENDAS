import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import IPaginateCustomer from '@modules/customers/domain/models/IPaginateCustomer';

@injectable()
class ListCustomerService {
    constructor(
        @inject('CustomersRepository')
        private _customersRepository: ICustomersRepository,
    ) {}
    public async execute(): Promise<IPaginateCustomer> {
        const customers = await this._customersRepository.listAllCostumers();

        return customers;
    }
}

export default ListCustomerService;
