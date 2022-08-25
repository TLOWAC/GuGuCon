import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
                                entities: ['dist/**/*.entity{.ts,.js}'],
                                synchronize: true,
                                dropSchema: true,
                                autoLoadEntities: true,
                                type: 'mysql',
                                logging: 'all',
                                logger: 'file',
                        }),
                        dataSourceFactory: async (options) => {
                                const dataSource = await new DataSource(options).initialize();
                                try {
                                        if (!dataSource.isInitialized) {
                                                await dataSource.initialize();
                                        }

                                        Logger.debug('Database is running');
                                } catch (error) {
                                        Logger.error(error.stack);
                                }
                                return dataSource;
                        },
                }),
        ],
})
export class DatabaseModule {}
