import AppError from '@shared/errors/AppError';
import IBaseCustomerService from '@modules/customers/domain/models/IBaseCustomerService';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private _customerRepository: ICustomersRepository,
    ) {}
    async execute({ id }: IBaseCustomerService): Promise<void> {
        const customer = await this._customerRepository.findByID(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await this._customerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
