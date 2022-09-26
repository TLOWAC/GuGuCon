import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginOauth2GoogleRequest {
        @IsString()
        @IsNotEmpty()
        @IsOptional()
        @ApiProperty({ description: "JWT 엑세스 토큰", required: false })
        token: string;
}
