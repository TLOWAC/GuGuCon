import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { LoggingInterceptor } from '@@shared/interceptors';

import { AuthModule } from './apis/v1/auth/auth.module';
import { UserModule } from './apis/v1/user/user.module';
import { CoreModule } from './libs/core.module';

@Module({
        imports: [CoreModule, UserModule, AuthModule, PassportModule],
        controllers: [],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: LoggingInterceptor,
                },
        ],
})
export class AppModule {}
