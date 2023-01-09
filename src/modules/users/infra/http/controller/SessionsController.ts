import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';
import { container, injectable } from 'tsyringe';

@injectable()
export default class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const sessionService = container.resolve(CreateSessionsService);

        const user = await sessionService.execute({
            email,
            password,
        });

        return response.json(instanceToInstance(user));
    }
}
