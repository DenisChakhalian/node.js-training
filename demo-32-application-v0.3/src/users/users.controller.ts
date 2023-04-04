import {BaseController} from '../common/base.controller';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors/http-error.class';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {ILogger} from '../logger/logger.interface';
import 'reflect-metadata';
import {IUsersController} from './users.controller.interface';
import fs from "fs";
import {resolve} from "path";

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRouter([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login},
        ]);
    }

    login(req: Request, res: Response, next: NextFunction): void {
        // this.ok(res, "login");
        next(new HttpError(401, 'auth error', 'login'));
    }

    register(req: Request, res: Response, next: NextFunction): void {
        this.ok(res, 'register');
    }
}
