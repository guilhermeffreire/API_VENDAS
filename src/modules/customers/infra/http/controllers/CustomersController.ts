import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import { container } from 'tsyringe';

export default class CustomersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listCustomers = container.resolve(ListCustomerService);

        const customers = await listCustomers.execute();

        return response.json(customers);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomerService = container.resolve(ShowCustomerService);

        const customer = await showCustomerService.execute({ id });

        return response.json(customer);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        const createCustomer = container.resolve(CreateCustomerService);

        const customer = await createCustomer.execute({ name, email });

        return response.json(customer);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateCustomer = container.resolve(UpdateCustomerService);

        const customer = await updateCustomer.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = container.resolve(DeleteCustomerService);

        const customer = await deleteCustomer.execute({ id });

        return response.json(customer);
    }
}
