import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controller/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
);

export default sessionsRoutes;
