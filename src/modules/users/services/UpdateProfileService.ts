import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import { IUpdateProfileService } from '@modules/users/domain/model/IUpdateProfileService';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IUpdateProfileService): Promise<User> {
        const user = await this._userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const emailExists = await this._userRepository.findByEmail(email);

        if (emailExists && emailExists.id != user.id) {
            throw new AppError('There is already one user with this email.');
        }

        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        if (password && old_password) {
            const passwordCorrect = await compare(old_password, user.password);

            if (!passwordCorrect) {
                throw new AppError('Old Password does not match.');
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await this._userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
