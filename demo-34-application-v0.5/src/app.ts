import express, {Express} from 'express';
import {Server} from 'http';
import {IConfigService} from "./config/config.service.interface";
import {IUsersController} from "./users/users.controller.interface";
import {UsersController} from "./users/users.controller";
import {ILogger} from './logger/logger.interface';
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {inject, injectable} from 'inversify';
import {TYPES} from './types';
import {json} from "body-parser"
import 'reflect-metadata';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UsersController) private userController: UsersController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.ConfigService) private configService: IConfigService,
    ) {
        this.app = express();
        this.port = 8000;
    }

    useMiddleware(): void {
        this.app.use(json());
    }

    useRoutes(): void {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters(): void {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init(): Promise<void> {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server on http://localhost:${this.port}`);
    }
}
