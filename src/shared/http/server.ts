import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//Celebrate Erros
app.use(errors());

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        nextFunction: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        console.log(error);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

app.listen(3333, () => console.log('Server is running in port 3333...'));
