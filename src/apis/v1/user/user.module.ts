import { User } from '@entities/index';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'repositories';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
        imports: [TypeOrmModule.forFeature([User])],
        controllers: [UserController],
        providers: [UserService, UserRepository],
})
export class UserModule {}
