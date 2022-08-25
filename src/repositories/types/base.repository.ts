import { FindOptionsWhere, Repository } from 'typeorm';

import { IBaseRepository } from './base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
	private entity: Repository<T>;

	constructor(entity: Repository<T>) {
		this.entity = entity;
	}

	public async findOneById(id: number): Promise<T> {
		return await this.entity.findOne(id);
	}

	public async findOneByCondition(filterCondition: FindOptionsWhere<T>): Promise<T> {
		return await this.entity.findOne({ where: filterCondition });
	}

	public async findAll(): Promise<T[]> {
		return await this.entity.find();
	}

	public async createOne(options: T) {
		return await this.entity.save(options);
	}

	public async updateOne(id: number, options: T) {
		return await this.entity.update(id, options);
	}

	public async remove(id: number) {
		return await this.entity.delete(id);
	}
}
