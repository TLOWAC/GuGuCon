import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { LoggingInterceptor } from '@@shared/interceptors';
import { HttpLoggerMiddleware } from '@@shared/middlewares';
import { EnvModule, MySQLModule } from '@@shared/modules';

import { AuthModule } from './apis/v1/auth/auth.module';
import { UserModule } from './apis/v1/user/user.module';

@Module({
        imports: [
                EnvModule,
                MySQLModule,
                PassportModule,
                UserModule,
                AuthModule,
                RouterModule.register([
                        {
                                path: 'user',
                                module: UserModule,
                        },
                        {
                                path: 'auth',
                                module: AuthModule,
                        },
                ]),
        ],
        controllers: [],
        providers: [
                {
                        provide: APP_INTERCEPTOR,
                        useClass: LoggingInterceptor,
                },
        ],
})
export class AppModule {
        configure(consumer: MiddlewareConsumer) {
                consumer.apply(HttpLoggerMiddleware).forRoutes({
                        path: '*',
                        method: RequestMethod.ALL,
                });
        }
}
