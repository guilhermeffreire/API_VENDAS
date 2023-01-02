import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findByID(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerEmail = await customerRepository.findByEmail(email);

        if (customerEmail && email != customer.email) {
            throw new AppError(
                'There is already one customer with this email.',
            );
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
