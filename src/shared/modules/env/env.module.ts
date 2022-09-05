import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration, validationSchema } from '.';

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        load: [configuration],
                        envFilePath: `${process.env.NODE_ENV}.env`,
                        validationSchema: validationSchema,
                }),
        ],
        controllers: [],
        providers: [],
})
export class EnvModule {}
