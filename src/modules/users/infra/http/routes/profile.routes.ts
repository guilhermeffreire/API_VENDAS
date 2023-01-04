import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import ProfileController from '../controller/ProfileController';
import { container } from 'tsyringe';

const profileRouter = Router();
const profileController = container.resolve(ProfileController);

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    profileController.update,
);

export default profileRouter;
