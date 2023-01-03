import { IUser } from '@modules/users/domain/model/IUser';
import { ICreateUserService } from '@modules/users/domain/model/ICreateUserService';
import User from '@modules/users/infra/typeorm/entities/User';

export interface IUsersRepository {
    findByName(name: string): Promise<IUser | undefined>;
    findByID(id: string): Promise<IUser | undefined>;
    findByEmail(email: string): Promise<IUser | undefined>;
    findAllUsers(): Promise<IUser[] | undefined>;
    create({ name, email, password }: ICreateUserService): Promise<User>;
    save(user: IUser): Promise<void>;
}
