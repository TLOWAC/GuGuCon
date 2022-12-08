import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { configuration, validationSchema } from ".";

@Module({
        imports: [
                ConfigModule.forRoot({
                        isGlobal: true,
                        load: [configuration],
                        envFilePath: `.env.${process.env.NODE_ENV}`,
                        validationSchema: validationSchema,
                }),
        ],
        controllers: [],
        providers: [],
})
export class EnvModule {}
