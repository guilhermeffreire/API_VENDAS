import User from '@modules/users/infra/typeorm/entities/User';

export interface IResponseCreateSessions {
    user: User;
    token: string;
}
