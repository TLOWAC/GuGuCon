import {
        BadRequestException,
        Injectable,
        Logger,
        NotAcceptableException,
        NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import bcryptjs from "bcryptjs";
import { Auth, google } from "googleapis";

import { User } from "@/database/entities";

import { UserService } from "../user/user.service";
import { LoginUserRequestDTO, RegisterUserRequestDTO } from "./dto";

@Injectable()
export class AuthService {
        private ouathClient: Auth.OAuth2Client;
        private logger: Logger = new Logger(AuthService.name);

        constructor(
                private userService: UserService,
                private jwtService: JwtService,
                private configService: ConfigService,
        ) {
                const clientId = this.configService.get<string>("GOOGLE_CLIENT_ID");
                const clientSecret = this.configService.get<string>("GOOGLE_CLIENT_SECRET");
                this.ouathClient = new google.auth.OAuth2(clientId, clientSecret);
        }

        async validateUser(loginUserDTO: LoginUserRequestDTO) {
                try {
                        const { username, password } = loginUserDTO;
                        const user = await this.userService.findUserByEmail({ username });

                        if (!user) {
                                throw new BadRequestException("user not found");
                        }

                        const isValidPassword = user.validatePassword(password);

                        if (!isValidPassword) {
                                throw new BadRequestException("password doesn't match");
                        }
                        return user;
                } catch (e) {
                        this.logger.error(e);
                }
        }

        async signUp(registerUserDto: RegisterUserRequestDTO) {
                try {
                        return await this.userService.createUser(registerUserDto);
                } catch (error) {
                        this.logger.error(error);
                }

                // this.userService.registerUserByEmail;
                // this.userService.registerUserBySocial;
        }

        async signIn(user: User) {
                try {
                        // generate jwt access token
                        const payload = { sub: user.id, username: user.username };
                        const jwtAccessToken = this.jwtService.sign(payload);

                        return {
                                accessToken: jwtAccessToken,
                        };
                } catch (e) {
                        this.logger.error(e);
                }
        }

        async signInGoogle(
                token: string,
                values: { userAgent: string; ipAddress: string },
        ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
                const googleAuthInfo = await this.ouathClient.getTokenInfo(token);
                const user = await this.userService.findUserByEmail({
                        username: googleAuthInfo.email,
                });

                if (user) {
                        /// publish accessToken & refreshToken
                }

                return undefined;
        }
}
