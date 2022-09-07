import { INestApplication, VersioningType } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Swagger } from 'configs';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { bootTerminalPrint } from '@@shared/utils';

import { AppModule } from './app.module';

class ExpressServer {
        app: INestApplication;
        config: ConfigService;
        swagger: Swagger;

        constructor() {
                ///
        }

        private pipeBuild() {
                this.app.useGlobalPipes(
                        new ValidationPipe({
                                whitelist: true,
                                forbidNonWhitelisted: true,
                        }),
                );
        }

        private middlewareBuild() {
                this.app.use(helmet());
                this.app.use(cookieParser());
        }

        private documentBuild() {
                this.swagger.pageSetup();
        }

        public async setup() {
                this.app = await NestFactory.create(AppModule);
                this.app.setGlobalPrefix('api');
                this.app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

                this.config = this.app.get(ConfigService);
                this.swagger = new Swagger(this.app);

                this.middlewareBuild();
                this.pipeBuild();
                this.documentBuild();
        }

        public async start() {
                await this.app.listen(this.config.get('port'), () => {
                        Logger.log(`server running on http://localhost:${this.config.get('port')}`);
                        Logger.log(
                                `swagger running on http://localhost:${this.config.get(
                                        'port',
                                )}/docs`,
                        );
                        Logger.log(`Running in ${this.config.get('environment')} mode`);
                        Logger.log(bootTerminalPrint());
                });
        }
}

async function main() {
        const expressServer = new ExpressServer();
        await expressServer.setup();
        await expressServer.start();
}

main();
