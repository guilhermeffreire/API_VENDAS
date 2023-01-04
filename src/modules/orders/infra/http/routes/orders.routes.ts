import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controller/OrdersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { container } from 'tsyringe';

const ordersRouter = Router();
const ordersController = container.resolve(OrdersController);

ordersRouter.use(isAuthenticated);

ordersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

ordersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    ordersController.create,
);

export default ordersRouter;
