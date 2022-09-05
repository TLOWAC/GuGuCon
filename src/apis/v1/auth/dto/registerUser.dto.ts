import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

enum RegisterEnumType {
        email,
}

export class RegisterUserDTO {
        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @ApiProperty({ default: 'Julie44@yahoo.com', description: 'email/nickname 정보' })
        username: string;

        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @Matches(/^[a-zA-Z0-9]*$/, {
                message: 'password only accepts english and number',
        })
        @ApiProperty({ default: 'qwer1234', description: '비밀번호' })
        password: string;

        @IsEnum(RegisterEnumType)
        @ApiProperty({
                // default: RegisterEnumType.email,
                enum: RegisterEnumType,
                // description: '회원가입 타입',
        })
        type: RegisterEnumType;
}
