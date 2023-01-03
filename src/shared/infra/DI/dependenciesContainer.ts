import { container } from 'tsyringe';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';

const dependenciesContainer = {
    Repositories: {
        Customer: container.registerSingleton<ICustomersRepository>(
            'CustomersRepository',
            CustomersRepository,
        ),
    },
    Controllers: {
        Customer: container.registerSingleton<CustomersController>(
            'CustomersController',
            CustomersController,
        ),
    },
};

export default dependenciesContainer;
