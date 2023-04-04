import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: "Incorrect email!"})
    email: string;

    @IsString({message: "Password is not specified!"})
    password: string;

    @IsString({message: "Name is not specified!"})
    name: string;
}