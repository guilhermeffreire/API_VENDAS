import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';
import { container } from 'tsyringe';

const passwordRouter = Router();
const forgotPasswordController = container.resolve(ForgotPasswordController);
const resetPasswordController = container.resolve(ResetPasswordController);

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
        },
    }),
    forgotPasswordController.create,
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    resetPasswordController.create,
);

export default passwordRouter;
