import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import IBaseCustomerService from '@modules/customers/domain/models/IBaseCustomerService';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
@injectable()
class ShowCustomerService {
    constructor(
        @inject('CustomersRepository')
        private _customersRepository: ICustomersRepository,
    ) {}
    async execute({ id }: IBaseCustomerService): Promise<Customer | undefined> {
        const customer = await this._customersRepository.findByID(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
