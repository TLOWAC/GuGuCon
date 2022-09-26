import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class LoginUserResponseDTO {
        @ApiProperty({ description: "jwt 엑세스 토큰" })
        @IsString()
        @IsNotEmpty()
        accessToken: string;

        @ApiPropertyOptional({ description: "jwt 리프레쉬 토큰" })
        @IsString()
        @IsOptional()
        refreshToken?: string;
}
