import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { awesomeCli } from './configs/cli';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  /**
   * * whitelist
   * : DTO 에 정의되지 안은 값은 필터링되며 사용자가 값을 입력하였더라도 API 에서는 이를 필터링한다.
   *
   * * forbidNonWhitelisted
   * : DTO 에 정의되어 있지 않은 값이 존재하는 경우 에러를 발생시킵니다.
   *
   * * transform
   * : 각종 request 요청을 (json) DTO 로 변환합니다.
   *
   * * disableErrorMessages
   * : 에러가 발생하였을때 에러 메시지의 표시 여부를 설정합니다.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  await app.listen(3030, () => {
    Logger.log(`server running on http://localhost:${config.get('port')}`);
    Logger.log(`Running in ${config.get('environment')} mode`);
    Logger.log(awesomeCli());
  });
}

bootstrap();
