import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
        imports: [
                TypeOrmModule.forRootAsync({
                        imports: [ConfigModule],
                        inject: [ConfigService],
                        useFactory: async (config: ConfigService) => ({
                                database: config.get<string>('db_name'),
                                username: config.get<string>('db_user'),
                                password: config.get<string>('db_password'),
                                host: config.get<string>('db_host'),
                                port: parseInt(config.get<string>('db_port')),
                                // entities: ['dist/**/*.entity{.ts,.js}'],
                                synchronize: false,
                                dropSchema: false,
                                autoLoadEntities: true,
                                type: 'mysql',
                                logging: 'all',
                                logger: 'file',
                        }),
                }),
        ],
})
export class MySQLModule {}
