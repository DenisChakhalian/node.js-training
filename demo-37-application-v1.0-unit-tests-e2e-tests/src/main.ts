import {App} from './app';
import {LoggerService} from './logger/logger.service';
import {IUsersController} from './users/users.controller.interface';
import {ExceptionFilter} from './errors/exception.filter';
import {Container, ContainerModule, interfaces} from 'inversify';
import {ILogger} from './logger/logger.interface';
import {TYPES} from './types';
import {IExceptionFilter} from './errors/exception.filter.interface';
import {UsersController} from './users/users.controller';
import {IUserService} from "./users/user.service.interface";
import {UserService} from "./users/user.service";
import {IConfigService} from "./config/config.service.interface";
import {ConfigService} from "./config/config.service";
import {PrismaService} from "./database/prisma.service";
import {UsersRepository} from "./users/users.repository";
import {IUsersRepository} from "./users/users.repository.interface";

export interface IBootstrapReturn {
    appContainer: Container;
    app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    bind<IUsersController>(TYPES.UsersController).to(UsersController);
    bind<IUserService>(TYPES.UsersService).to(UserService);
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    await app.init();
    return {app, appContainer};
}

export const boot = bootstrap();
