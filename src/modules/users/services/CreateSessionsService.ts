import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { ICreateSessionsService } from '@modules/users/domain/model/ICreateSessionsService';
import { IResponseCreateSessions } from '@modules/users/domain/model/IResponseCreateSessions';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateSessionsService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    async execute({
        email,
        password,
    }: ICreateSessionsService): Promise<IResponseCreateSessions> {
        const user = await this._userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordCorrect = await compare(password, user.password);

        if (!passwordCorrect) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default CreateSessionsService;
