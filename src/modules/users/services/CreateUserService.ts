import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const emailExists = await userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
