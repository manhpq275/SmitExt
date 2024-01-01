import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyFogotPasswordDto {
    @IsEmail(VerifyFogotPasswordDto, { message: "Email address is not valid." })
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}