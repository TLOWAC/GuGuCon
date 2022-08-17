import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './apis/v1/user/user.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ envFilePath: '.env' })],
  controllers: [],
  providers: [],
})
export class AppModule {}
