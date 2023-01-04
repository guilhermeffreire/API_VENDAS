import { container } from 'tsyringe';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import UsersController from '@modules/users/infra/http/controller/UsersController';
import UserAvatarController from '@modules/users/infra/http/controller/UserAvatarController';
import SessionsController from '@modules/users/infra/http/controller/SessionsController';
import ResetPasswordController from '@modules/users/infra/http/controller/ResetPasswordController';
import ProfileController from '@modules/users/infra/http/controller/ProfileController';
import ForgotPasswordController from '@modules/users/infra/http/controller/ForgotPasswordController';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import ProductsController from '@modules/products/infra/http/controllers/ProductsController';

const dependenciesContainer = {
    Repositories: {
        Customer: container.registerSingleton<ICustomersRepository>(
            'CustomersRepository',
            CustomersRepository,
        ),
        Users: container.registerSingleton<IUsersRepository>(
            'UsersRepository',
            UsersRepository,
        ),
        UsersToken: container.registerSingleton<IUsersTokensRepository>(
            'UsersTokensRepository',
            UsersTokensRepository,
        ),
        Products: container.registerSingleton<IProductsRepository>(
            'ProductRepository',
            ProductRepository,
        ),
    },
    Controllers: {
        Customer: container.registerSingleton<CustomersController>(
            'CustomersController',
            CustomersController,
        ),
        Users: container.registerSingleton<UsersController>(
            'UsersController',
            UsersController,
        ),
        UserAvatarController: container.registerSingleton<UserAvatarController>(
            'UserAvatarController',
            UserAvatarController,
        ),
        SessionsController: container.registerSingleton<SessionsController>(
            'SessionsController',
            SessionsController,
        ),
        ResetPasswordController:
            container.registerSingleton<ResetPasswordController>(
                'ResetPasswordController',
                ResetPasswordController,
            ),
        ProfileController: container.registerSingleton<ProfileController>(
            'ProfileController',
            ProfileController,
        ),
        ForgotPasswordController:
            container.registerSingleton<ForgotPasswordController>(
                'ForgotPasswordController',
                ForgotPasswordController,
            ),
        ProductsController: container.registerSingleton<ProductsController>(
            'ProductsController',
            ProductsController,
        ),
    },
};

export default dependenciesContainer;
