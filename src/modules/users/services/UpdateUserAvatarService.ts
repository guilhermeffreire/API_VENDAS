import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import { IUpdateUserAvatarService } from '@modules/users/domain/model/IUpdateUserAvatarService';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    async execute({
        user_id,
        avatarFilename,
    }: IUpdateUserAvatarService): Promise<User> {
        const user = await this._userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExistis = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExistis) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await this._userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
