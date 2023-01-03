import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { ISendForgotPasswordEmail } from '@modules/users/domain/model/ISendForgotPasswordEmail';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private _usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private _usersTokenRepository: IUsersTokensRepository,
    ) {}

    public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
        const user = await this._usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not found.');
        }

        const { token } = await this._usersTokenRepository.generate(user.id);

        console.log('Token gerado pelo repository : ', token);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`, //Feito desta forma para testes do token
                    token,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
