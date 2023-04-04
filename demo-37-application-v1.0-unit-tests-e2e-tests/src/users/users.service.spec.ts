import "reflect-metadata"
import {Container} from "inversify";
import {IConfigService} from "../config/config.service.interface";
import {IUsersRepository} from "./users.repository.interface";
import {IUserService} from "./user.service.interface";
import {TYPES} from "../types";
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {UserModel} from "@prisma/client";


const ConfigServiceMock: IConfigService = {
    get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
    find: jest.fn(),
    create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
    container.bind<IUserService>(TYPES.UsersService).to(UserService);
    container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
    container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

    configService = container.get<IConfigService>(TYPES.ConfigService);
    usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
    usersService = container.get<IUserService>(TYPES.UsersService);
});

let createdUser: UserModel | null;

describe("User Service", () => {
    it("createUser", async () => {
        configService.get = jest.fn().mockReturnValueOnce("1");
        usersRepository.create = jest.fn().mockImplementationOnce((user: User): UserModel => ({
            name: user.name,
            email: user.email,
            password: user.password,
            id: 1,
        }));
        createdUser = await usersService.createUser({
            email: "my@den.com",
            name: "denays",
            password: "1",
        });
        expect(createdUser?.id).toEqual(1);
        expect(createdUser?.password).not.toEqual("1");
    });
    it("Success password", async ()=> {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const res = await usersService.validateUser({
            email:"my@den.com",
            password: "1",
        })
        expect(res).toBeTruthy();
    });

    it("Incorrect password", async ()=> {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const res = await usersService.validateUser({
            email:"my@den.com",
            password: "2",
        });
        expect(res).toBeFalsy();
    });

    it("User does not exist", async ()=> {
        usersRepository.find = jest.fn().mockReturnValueOnce(null);
        const res = await usersService.validateUser({
            email:"my@den.com",
            password: "1",
        });
        expect(res).toBeFalsy();
    });
});