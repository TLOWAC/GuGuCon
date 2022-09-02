import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';

import { User } from '@@database/entities';

/**
 * crud naming convention
 * create       -> createUser
 * read         -> getUser ( findUser 는 서비스에서 사용하기 적합한 네이밍 컨벤션 )
 * update       -> updateUser
 * delete       -> deleteUser
 */
@Injectable()
export class UserRepository {
        constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

        async getAllUser(): Promise<User[]> {
                return this.userRepo.find();
        }

        async getById(id: number): Promise<User> {
                return this.userRepo.findOne({ where: { id: +id } });
        }

        async getUserBy(options: FindOptionsWhere<User>) {
                return this.userRepo.findOneBy(options);
        }

        async createUser(options: User): Promise<User> {
                return this.userRepo.save(options);
        }

        async updateOne(id: number, options: User) {
                return this.userRepo.update({ id }, options);
        }

        async deleteUser(id: number): Promise<DeleteResult> {
                return this.userRepo.delete(id);
        }
}
