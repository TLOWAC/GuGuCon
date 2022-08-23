import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { UserModule } from './apis/v1/user/user.module';
import { HttpLoggerMiddleware } from './common/middlewares';
import { CoreModule } from './libs/core.module';

@Module({
	imports: [CoreModule, UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(HttpLoggerMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}
}
