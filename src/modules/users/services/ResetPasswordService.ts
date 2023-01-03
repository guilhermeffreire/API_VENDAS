import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IResetPasswordService } from '@modules/users/domain/model/IResetPasswordService';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private _usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private _usersTokenRepository: IUsersTokensRepository,
    ) {}

    public async execute({
        token,
        password,
    }: IResetPasswordService): Promise<void> {
        const userToken = await this._usersTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists.');
        }

        const user = await this._usersRepository.findByID(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await hash(password, 8);

        await this._usersRepository.save(user);
    }
}

export default ResetPasswordService;
