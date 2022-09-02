import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@@database/entities';
import { UserRepository } from '@@database/repositories';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
        imports: [TypeOrmModule.forFeature([User])],
        controllers: [UserController],
        providers: [UserService, UserRepository],
        exports: [UserService], // 다른 모듈에서도 UserModule 의 UserService 를 사용할 수 있도록 UserService 를 export 해줘야 한다.
})
export class UserModule {}
