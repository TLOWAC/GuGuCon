import * as dotenv from "dotenv";
import { env } from "process";
import { DataSourceOptions } from "typeorm";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        host: env.DATABASE_HOST,
        port: parseInt(env.DATABASE_PORT),
        username: env.DATABASE_USERNAME,
        password: env.DATABASE_PASSWORD,
        database: env.DATABASE_NAME,
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrationsTableName: "migrations",
        synchronize: false,
        dropSchema: false,
        extra: {
                factories: ["src/database/factories/**/*{.ts,.js}"],
                seeds: ["src/database/seeds/**/*{.ts,.js}"],
        },
        logging: ["query", "error"],
};
