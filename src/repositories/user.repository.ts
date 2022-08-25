import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '../entities';

@Injectable()
export class UserRepository extends Repository<User> {
        constructor(private dataSource: DataSource) {
                super(User, dataSource.createEntityManager());
        }

        async findAll(): Promise<User[]> {
                return this.createQueryBuilder().getMany();
        }

        async findById(id: string): Promise<User> {
                return this.findOne({ where: { id: +id } });
        }

        async createOne(options: User): Promise<User> {
                return this.create(options);
        }

        async updateOne(id: string, options: User) {
                return this.update({ id: +id }, options);
        }
}
