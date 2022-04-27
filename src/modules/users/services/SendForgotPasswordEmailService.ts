import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '../typeorm/repositories/UsersTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UsersTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found.');
        }

        const token = await userTokenRepository.generate(user.id);

        console.log('Token gerado pelo repository : ', token);

        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida ${token?.token}`,
        });
    }
}

export default SendForgotPasswordEmailService;
