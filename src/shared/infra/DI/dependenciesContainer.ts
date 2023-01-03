import { container } from 'tsyringe';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

const dependenciesContainer = {
    Repositories: {
        Customer: container.registerSingleton<ICustomersRepository>(
            'CustomersRepository',
            CustomersRepository,
        ),
    },
};

export default dependenciesContainer;
