import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { instanceToInstance } from 'class-transformer';
import { container, injectable } from 'tsyringe';

@injectable()
export default class UsersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listUser = container.resolve(ListUserService);

        const users = await listUser.execute();

        return response.json(instanceToInstance(users));
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({ name, email, password });

        return response.json(instanceToInstance(user));
    }
}
