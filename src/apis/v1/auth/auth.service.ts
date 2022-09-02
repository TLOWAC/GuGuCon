import {
        BadRequestException,
        Injectable,
        Logger,
        NotAcceptableException,
        NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';
import { Auth, google } from 'googleapis';

import { User } from '@@database/entities';

import { UserService } from '../user/user.service';
import { loginUserDTO, RegisterUserDTO } from './dto';

@Injectable()
export class AuthService {
        private ouathClient: Auth.OAuth2Client;
        private logger: Logger = new Logger(AuthService.name);

        constructor(private userService: UserService, private jwtService: JwtService) {
                const clientId = process.env.GOOGLE_CLIENT_ID;
                const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
                this.ouathClient = new google.auth.OAuth2(clientId, clientSecret);
        }

        async validateUser(loginUserDTO: loginUserDTO) {
                try {
                        const { username, password } = loginUserDTO;
                        const user = await this.userService.findUserByEmail({ username });
                        const hashedPassword = user.password;

                        const isvalidPassword = bcryptjs.compare(hashedPassword, password);

                        if (!user || !isvalidPassword) {
                                throw new NotAcceptableException('no matching user exist');
                        }
                } catch (e) {
                        this.logger.error(e);
                }
        }

        async register(registerUserDto: RegisterUserDTO) {
                try {
                        return await this.userService.createUser(registerUserDto);
                } catch (error) {
                        this.logger.error(error);
                }

                // this.userService.registerUserByEmail;
                // this.userService.registerUserBySocial;
        }

        async login(user: User) {
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

        // async loginGoogle(
        //         token: string,
        //         values: { userAgent: string; ipAddress: string },
        // ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
        //         const googleAuthInfo = await this.ouathClient.getTokenInfo(token);
        //         const user = await this.userService.findUserByEmail(googleAuthInfo.email);

        //         if (user) {
        //                 /// publish accessToken & refreshToken
        //         }

        //         return undefined;
        // }
}
