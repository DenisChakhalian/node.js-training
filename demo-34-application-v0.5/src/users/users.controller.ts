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
import {UserService} from "./user.service";
import {ValidateMiddleware} from "../common/validate.middleware";

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UsersService) private userService: UserService,
    ) {
        super(loggerService);
        this.bindRouter([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)]
            },
            {path: '/login', method: 'post', func: this.login},
        ]);
    }

    login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
        // this.ok(res, "login");
        console.log(req.body);
        next(new HttpError(401, 'auth error', 'login'));
    }

    async register({body}: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
        const result = await this.userService.createUser(body);
        if (!result) {
            return next(new HttpError(422, "This user is exist!"));
        }
        this.ok(res, {email: result.email});
    }
}
