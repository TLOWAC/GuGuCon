import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration, validationSchema } from './constant';
import { DatabaseModule } from './database';

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        load: [configuration],
                        envFilePath: `${process.env.NODE_ENV}.env`,
                        validationSchema: validationSchema,
                }),
                DatabaseModule,
        ],
        controllers: [],
        providers: [],
})
export class CoreModule {}
