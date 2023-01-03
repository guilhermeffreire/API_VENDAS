import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import { IShowProfileService } from '@modules/users/domain/model/IShowProfileService';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    public async execute({ user_id }: IShowProfileService): Promise<User> {
        const user = await this._userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowProfileService;
