import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginUserRequestDTO {
        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @ApiProperty({ default: "user@example.com" })
        username: string;

        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @Matches(/^[a-zA-Z0-9]*$/, {
                message: "password only accepts english and number",
        })
        @ApiProperty({ default: "qwer1234" })
        password: string;
}
