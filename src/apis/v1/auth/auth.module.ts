import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy, LocalStrategy],
        imports: [
                UserModule,
                JwtModule.registerAsync({
                        imports: [ConfigModule],
                        inject: [ConfigService],
                        useFactory: (config: ConfigService) => ({
                                secret: config.get<string>('JWT_SECRET'),
                                signOptions: { expiresIn: '60s' },
                        }),
                }),
                PassportModule,
        ],
        exports: [JwtStrategy],
})
export class AuthModule {}
