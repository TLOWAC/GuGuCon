import { LoggingInterceptor } from '@common/interceptors';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UserModule } from './apis/v1/user/user.module';
import { CoreModule } from './libs/core.module';

@Module({
        imports: [CoreModule, UserModule],
        controllers: [],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: LoggingInterceptor,
                },
        ],
})
export class AppModule {}
