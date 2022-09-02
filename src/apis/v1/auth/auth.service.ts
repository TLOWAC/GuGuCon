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

        async validateUser({ username, password }: { username: string; password: string }) {
                try {
                        const user = await this.userService.findUserByEmail(username);

                        const isValid = bcryptjs.compareSync(user.password, password);
                        if (!isValid) {
                                throw new BadRequestException();
                        }

                        return user;
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

        async login(loginUserDTO: loginUserDTO) {
                try {
                        const { username, password } = loginUserDTO;
                        const user = await this.userService.findOneUserByOption({ username });
                        const hashedPassword = user.password;

                        const isvalidPassword = bcryptjs.compare(hashedPassword, password);

                        if (!user || !isvalidPassword) {
                                throw new NotAcceptableException('no matching user exist');
                        }

                        // generate jwt access token
                        const payload = { username: user.username, sub: user.id };
                        const jwtAccessToken = this.jwtService.sign(payload);

                        return {
                                access_token: jwtAccessToken,
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
