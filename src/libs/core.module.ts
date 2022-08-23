import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environment, validationSchema } from './constant';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [environment],
			envFilePath: `.env.${process.env.NODE_ENV}}`,
			validationSchema: validationSchema,
		}),
	],
	controllers: [],
	providers: [],
})
export class CoreModule {}
