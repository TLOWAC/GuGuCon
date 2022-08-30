import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const defaultOrmConfigOptions: DataSourceOptions = {
        type: 'mysql',
        host: env.DATABASE_HOST,
        port: parseInt(env.DATABASE_PORT),
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME,
        entities: ['src/database/entities/**/*.entity.ts'],
        migrations: ['src/database/migrations/*.ts'],
        migrationsTableName: 'migrations',
        synchronize: false,
        dropSchema: false,
        extra: {
                factories: ['src/database/factories/**/*{.ts,.js}'],
                seeds: ['src/database/seeds/**/*{.ts,.js}'],
        },
};
