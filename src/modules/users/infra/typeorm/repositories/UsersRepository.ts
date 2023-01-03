import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUserService } from '@modules/users/domain/model/ICreateUserService';
import { IUser } from '@modules/users/domain/model/IUser';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
    private readonly _ormRepository: Repository<User>;
    constructor() {
        this._ormRepository = getRepository(User);
    }
    async findByName(name: string): Promise<User | undefined> {
        const user = await this._ormRepository.findOne({
            where: { name },
        });

        return user;
    }

    async findByID(id: string): Promise<User | undefined> {
        const user = await this._ormRepository.findOne({
            where: { id },
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this._ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this._ormRepository.find();

        return users;
    }

    async create({ name, email, password }: ICreateUserService): Promise<User> {
        const user = await this._ormRepository.create({
            name,
            email,
            password,
        });

        await this.save(user);

        return user;
    }

    async save(user: IUser): Promise<void> {
        await this._ormRepository.save(user);
    }
}
