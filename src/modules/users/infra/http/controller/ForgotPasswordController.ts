import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import { container, injectable } from 'tsyringe';

@injectable()
export default class ForgotPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmail = container.resolve(
            SendForgotPasswordEmailService,
        );

        await sendForgotPasswordEmail.execute({ email });

        return response.status(204).json();
    }
}
