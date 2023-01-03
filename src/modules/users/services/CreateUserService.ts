import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';
import { ICreateUserService } from '@modules/users/domain/model/ICreateUserService';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    async execute({
        name,
        email,
        password,
    }: ICreateUserService): Promise<User> {
        const emailExists = await this._userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const hashPassword = await hash(password, 8);

        const user = this._userRepository.create({
            name,
            email,
            password: hashPassword,
        });

        return user;
    }
}

export default CreateUserService;
