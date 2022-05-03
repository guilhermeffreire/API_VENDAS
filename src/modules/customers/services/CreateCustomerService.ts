import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customerEmail = await customerRepository.findByEmail(email);

        if (customerEmail) {
            throw new AppError('Email address already used.');
        }

        const customer = customerRepository.create({
            name,
            email,
        });

        await customerRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;
