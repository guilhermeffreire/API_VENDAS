import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { container, injectable } from 'tsyringe';

@injectable()
export default class ResetPasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({ token, password });

        return response.status(204).json();
    }
}
