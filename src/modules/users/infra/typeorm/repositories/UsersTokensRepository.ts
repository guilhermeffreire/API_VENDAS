import { EntityRepository, getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { IUserToken } from '@modules/users/domain/model/IUserToken';

@EntityRepository(UserToken)
export class UsersTokensRepository implements IUsersTokensRepository {
    private readonly _ormRepository: Repository<UserToken>;

    constructor() {
        this._ormRepository = getRepository(UserToken);
    }
    async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this._ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }

    async generate(user_id: string): Promise<UserToken> {
        const userToken = await this._ormRepository.create({ user_id });

        await this.save(userToken);

        return userToken;
    }

    async save(userToken: IUserToken): Promise<void> {
        await this._ormRepository.save(userToken);
    }
}
