import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "apis/v1/user/user.service";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayload = {
        username: string;
        sub: string;
        iat: number;
        exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
        constructor(private userService: UserService, private configService: ConfigService) {
                super({
                        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Header.Authorization 에 셋팅된 Bear 토큰을 사용한다.
                        ignoreExpiration: false,
                        secretOrKey: configService.get<string>("JWT_SECRET"),
                });
        }
        async validate(payload: JwtPayload) {
                const { username } = payload;
                const user = await this.userService.findUserByEmail({ username });
                if (!user) {
                        throw new UnauthorizedException("Invalid Token");
                }
                return { userId: user.id, username: user.username };
        }
}
