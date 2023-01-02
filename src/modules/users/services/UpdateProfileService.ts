import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

class UpdateProfileService {
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findByID(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const emailExists = await userRepository.findByEmail(email);

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

        await userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
