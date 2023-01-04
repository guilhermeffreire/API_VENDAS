import { Router } from 'express';
import UsersController from '../controller/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import UserAvatarController from '../controller/UserAvatarController';
import { container } from 'tsyringe';

const usersRouter = Router();
const usersController = container.resolve(UsersController);
const userAvatarControler = container.resolve(UserAvatarController);
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarControler.update,
);

export default usersRouter;
