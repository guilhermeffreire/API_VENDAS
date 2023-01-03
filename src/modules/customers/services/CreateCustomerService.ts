import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private _customerRepository: ICustomersRepository,
    ) {}
    async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const customerEmail = await this._customerRepository.findByEmail(email);

        if (customerEmail) {
            throw new AppError('Email address already used.');
        }

        const customer = await this._customerRepository.create({
            name,
            email,
        });

        return customer;
    }
}

export default CreateCustomerService;
