import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import { container, injectable } from 'tsyringe';

@injectable()
export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;

        const sendForgotPassordEmail = container.resolve(
            SendForgotPasswordEmailService,
        );

        await sendForgotPassordEmail.execute({ email });

        return response.status(204).json();
    }
}
