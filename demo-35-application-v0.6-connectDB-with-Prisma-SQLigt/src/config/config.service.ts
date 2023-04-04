import {IConfigService} from "./config.service.interface";
import {config, DotenvConfigOutput, DotenvParseOutput} from "dotenv"
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
    ) {
        const result: DotenvConfigOutput = config();
        if (result.error) {
            this.logger.error("[ConfigService] Failed to read file .env or he is not exist!");
        } else {
            this.logger.log("[ConfigService] Configuration .env uploaded!")
            this.config = result.parsed as DotenvParseOutput;
        }
    }

    get(key: string): string {
        return this.config[key];
    }
}