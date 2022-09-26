import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy],
        imports: [
                UserModule,
                JwtModule.registerAsync({
                        imports: [ConfigModule],
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
