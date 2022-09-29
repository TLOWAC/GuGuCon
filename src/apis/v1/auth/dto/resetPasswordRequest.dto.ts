import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordRequestDTO {
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        @ApiProperty()
        username: string;
}
