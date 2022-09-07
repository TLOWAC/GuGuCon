import {
        Body,
        Controller,
        Delete,
        Get,
        HttpException,
        HttpStatus,
        Ip,
        Logger,
        Param,
        Patch,
        Post,
        Req,
        Request,
        Res,
        UnauthorizedException,
        UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@@database/entities';
import { LocalAuthGuard } from '@@shared/guards/local-auth.guard';

import { AuthService } from './auth.service';
import { loginUserDTO, RegisterUserDTO } from './dto';
import GoogleAuthTokenDto from './dto/google-auth-token.dto';

@ApiTags('Auth')
@Controller({ version: '1' }) // path 는 app.module.ts 에서 RouterModule 에 정의됨.
export class AuthController {
        private logger: Logger = new Logger(AuthService.name);

        constructor(private readonly authService: AuthService) {}

        @UseGuards(LocalAuthGuard)
        @Post('login')
        @ApiOperation({
                summary: '로그인',
        })
        @ApiBody({ type: loginUserDTO })
        login(@Request() req) {
                const user = this.authService.login(req.user);
                return user;
        }

        @Post('register')
        @ApiOperation({
                summary: '회원가입',
        })
        @ApiResponse({ type: User })
        register(@Body() registerUserDto: RegisterUserDTO): Promise<User> {
                console.log('createUserDto', registerUserDto);
                const user = this.authService.register(registerUserDto);
                return user;
        }

        // @Post('/login/google')
        // googleLogin(
        //         @Body() body: GoogleAuthTokenDto,
        //         @Req() req,
        //         @Ip() ip: string,
        // ): Promise<{ accessToken: string; refreshToken: string }> {
        //         const result = this.authService.loginGoogle(body.token, {
        //                 userAgent: req.headers['user-agent'],
        //                 ipAddress: ip,
        //         });
        //         if (result) {
        //                 return result;
        //         } else {
        //                 throw new UnauthorizedException('Error while logging in with google');
        //         }
        // }
}
