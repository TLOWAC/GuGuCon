import {
        Body,
        Controller,
        Get,
        Ip,
        Logger,
        NotFoundException,
        Post,
        Put,
        Req,
        Request,
        Res,
        UnauthorizedException,
        UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response as ExpressResponse } from "express";

import { GoogleAuthGuard } from "@/shared/guards/google-auth.guard";
import { LocalAuthGuard } from "@/shared/guards/local-auth.guard";
import { MailService } from "@/shared/providers/email/mail.service";

import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import {
        LoginOauth2GoogleRequest,
        LoginUserRequestDTO,
        LoginUserResponseDTO,
        RegisterUserRequestDTO,
        RegisterUserResponseDTO,
        ResetPasswordRequestDTO,
} from "./dto";

@ApiTags("Auth")
@Controller({ version: "1" }) // path 는 app.module.ts 에서 RouterModule 에 정의됨.
export class AuthController {
        private logger: Logger = new Logger(AuthService.name);

        constructor(
                private readonly authService: AuthService,
                private readonly userService: UserService,
                private readonly mailService: MailService,
        ) {}

        @Post("signIn")
        @ApiOperation({
                summary: "로그인",
        })
        @ApiBody({ type: LoginUserRequestDTO })
        @ApiResponse({ type: LoginUserResponseDTO })
        @UseGuards(LocalAuthGuard)
        signIn(@Request() req) {
                const user = this.authService.signIn(req.user);
                return user;
        }

        @Post("signUp")
        @ApiOperation({
                summary: "회원가입",
        })
        @ApiResponse({ type: RegisterUserResponseDTO })
        signUp(
                @Body() registerUserRequestDTO: RegisterUserRequestDTO,
        ): Promise<RegisterUserResponseDTO> {
                console.log("createUserDto", registerUserRequestDTO);
                const user = this.authService.signUp(registerUserRequestDTO);
                return user;
        }

        @Get("google")
        @ApiOperation({
                summary: "소셜 로그인 > Google",
        })
        @UseGuards(GoogleAuthGuard)
        signInByGoogle(
                @Body() body: LoginOauth2GoogleRequest,
                @Req() req,
                @Ip() ip: string,
        ): Promise<{ accessToken: string; refreshToken: string }> {
                const result = this.authService.signInGoogle(body.token, {
                        userAgent: req.headers["user-agent"],
                        ipAddress: ip,
                });

                if (result) {
                        return result;
                } else {
                        throw new UnauthorizedException("Error while logging in with google");
                }
        }

        @Get("google/callback")
        @ApiOperation({
                summary: "소셜 로그인 > Google Callback",
        })
        @UseGuards(GoogleAuthGuard)
        signInGoogleCallBack(@Req() req, @Res() res: ExpressResponse) {
                const { user } = req;
                this.logger.log("user", user);
        }

        @ApiOperation({
                summary: "로그인 > 비밀번호 찾기 ( 임시 패스워드 메일 발송 )",
        })
        @Put("resetPassword")
        async resetPassword(@Body() body: ResetPasswordRequestDTO) {
                const { username } = body;

                const user = await this.userService.findUserByEmail({ username });

                if (!user) {
                        throw new NotFoundException("user not found");
                }

                const newPwd = await user.resetPassword();

                const _ret = await this.mailService.resetPassword({ temporaryPassword: newPwd }); // 임시 패스워드 메일 발송
        }
}
