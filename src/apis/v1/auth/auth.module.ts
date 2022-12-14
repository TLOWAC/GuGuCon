import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy, JwtStrategy, KakaoStrategy, LocalStrategy } from "./strategies";

@Module({
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy, KakaoStrategy],
        imports: [
                UserModule,
                JwtModule.registerAsync({
                        inject: [ConfigService],
                        useFactory: (config: ConfigService) => ({
                                secret: config.get<string>("JWT_SECRET"),
                                signOptions: { expiresIn: "7d" },
                        }),
                }),
                PassportModule.register({ defaultStrategy: "jwt" }),
        ],
        exports: [JwtStrategy],
})
export class AuthModule {}
