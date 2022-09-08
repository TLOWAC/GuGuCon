import { INestApplication, VersioningType } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Swagger } from 'configs';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import helmet from 'helmet';

import { bootTerminalPrint } from '@/shared/utils';

import { AppModule } from './app.module';

class ExpressServer {
        app: INestApplication;
        config: ConfigService;
        swagger: Swagger;

        constructor() {
                ///
        }

        private buildPipe() {
                this.app.useGlobalPipes(
                        new ValidationPipe({
                                whitelist: true, // DTO 에 정의되지 않은 값은 필터링된다.
                                forbidNonWhitelisted: true, // DTO 에 정의되지 않는 값이 입력되는 경우 에러메시지 출력
                                transform: true, // 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
                        }),
                );
        }

        private buileMiddleware() {
                this.app.use(helmet()); // http 보안관련 헤더 설정
                this.app.enableCors(); // cors ( Cross Origin Resource Sharing ) 설정
                this.app.use(csurf()); // csrf ( Cross Site Request Forgery ) 설정
                this.app.use(cookieParser());
        }

        private buildDocument() {
                this.swagger.pageSetup();
        }

        public async setup() {
                this.app = await NestFactory.create(AppModule);
                this.app.setGlobalPrefix('api');
                this.app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

                this.config = this.app.get(ConfigService);
                this.swagger = new Swagger(this.app);

                this.buileMiddleware();
                this.buildPipe();
                this.buildDocument();
        }

        public async start() {
                await this.setup();
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
        // await expressServer.setup();
        await expressServer.start();
}

main();
