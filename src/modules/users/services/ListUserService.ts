import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/model/IUser';

@injectable()
class ListUserService {
    constructor(
        @inject('UsersRepository')
        private _userRepository: IUsersRepository,
    ) {}
    public async execute(): Promise<IUser[] | undefined> {
        const users = this._userRepository.findAllUsers();

        return users;
    }
}

export default ListUserService;
