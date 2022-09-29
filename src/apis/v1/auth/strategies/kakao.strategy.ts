import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

import { AuthService } from "../auth.service";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
        constructor(private authService: AuthService) {
                super({
                        clientID: "clientID",
                        callbackURL: "callbackURL",
                });
        }
        async validate(accessToken, refreshToken, profile, done) {
                const profileJSON = profile._json;
                const kakaoAccount = profileJSON.kakao_acount;
                const payload = {
                        name: kakaoAccount.profile.nickname,
                        kakaoId: kakaoAccount.id,
                        email:
                                kakaoAccount.has_email && !kakaoAccount.email_needs_agreement
                                        ? kakaoAccount.email
                                        : null,
                };

                done(null, payload);
        }
}
