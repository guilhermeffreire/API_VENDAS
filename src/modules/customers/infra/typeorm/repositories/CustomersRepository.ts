import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import IPaginateCustomer from '@modules/customers/domain/models/IPaginateCustomer';
import { PaginateCustomer } from '@modules/customers/domain/types/PaginateCustomer';
export class CustomersRepository implements ICustomersRepository {
    private readonly _ormRepository: Repository<Customer>;
    constructor() {
        this._ormRepository = getRepository(Customer);
    }
    async findByName(name: string): Promise<Customer | undefined> {
        const customer = await this._ormRepository.findOne({
            where: { name },
        });

        return customer;
    }

    async findByID(id: string): Promise<Customer | undefined> {
        const customer = await this._ormRepository.findOne({
            where: { id },
        });

        return customer;
    }

    async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = await this._ormRepository.findOne({
            where: { email },
        });

        return customer;
    }

    async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = await this._ormRepository.create({ name, email });

        await this.save(customer);

        return customer;
    }

    async save(customer: Customer): Promise<void> {
        await this._ormRepository.save(customer);
    }

    async remove(customer: Customer): Promise<void> {
        await this._ormRepository.remove(customer);
    }

    async listAllCostumers(): Promise<IPaginateCustomer> {
        const customers = await this._ormRepository
            .createQueryBuilder()
            .paginate();

        return customers as PaginateCustomer;
    }
}
