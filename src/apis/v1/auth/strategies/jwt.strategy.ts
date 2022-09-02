import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'apis/v1/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JWTPayload = {
        username: string;
        sub: number;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(private userService: UserService) {
                super({
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                        ignoreExpiration: false,
                        secretOrKey: process.env.JWT_SECRET,
                });
        }
        async validate(payload: JWTPayload) {
                const { username } = payload;
                const user = await this.userService.findUserByEmail({ username });
                if (!user) {
                        throw new UnauthorizedException('Invalid Token');
                }
                return { userId: user.id, username: user.username };
        }
}
