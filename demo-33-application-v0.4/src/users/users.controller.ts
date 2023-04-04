import {BaseController} from '../common/base.controller';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors/http-error.class';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {ILogger} from '../logger/logger.interface';
import 'reflect-metadata';
import {IUsersController} from './users.controller.interface';
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRouter([
            {path: '/register', method: 'post', func: this.register},
            {path: '/login', method: 'post', func: this.login},
        ]);
    }

    login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
        // this.ok(res, "login");
        console.log(req.body);
        next(new HttpError(401, 'auth error', 'login'));
    }

    async register({body}: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        const newUser = new User(body.email, body.name);
        await newUser.setPassword(body.password);
        this.ok(res, newUser);
    }
}
