import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
        constructor(private configServcie: ConfigService) {
                super({
                        // OAUTH_GOOGLE_CLIENT_ID
                        clientID: configServcie.get<string>("oauth_google_client_id"),
                        clientSecret: configServcie.get<string>("oauth_google_client_secret"),
                        callbackURL: configServcie.get<string>("oauth_google_callback_url"),
                        scope: ["email", "profile"],
                });
        }
        async validate(
                accessToken: string,
                refreshToken: string,
                profile: any,
                done: VerifyCallback,
        ): Promise<any> {
                const { name, emails, photos } = profile;

                console.log("accessToken:", accessToken);
                console.log("refreshToken:", refreshToken);
                console.log("profile:", profile);

                const user = {
                        email: emails[0].value,
                        firstName: name.givenName,
                        lastName: name.familyName,
                        picture: photos[0].value,
                        accessToken,
                };
                done(null, user);
        }
}
