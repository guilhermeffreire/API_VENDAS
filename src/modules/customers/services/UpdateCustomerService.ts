import Customer from '../infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '@modules/customers/domain/models/IUpdateCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private _customersRepository: ICustomersRepository,
    ) {}

    async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
        const customer = await this._customersRepository.findByID(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerEmail = await this._customersRepository.findByEmail(
            email,
        );

        if (customerEmail && email != customer.email) {
            throw new AppError(
                'There is already one customer with this email.',
            );
        }

        customer.name = name;
        customer.email = email;

        await this._customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
