import { FindOptionsWhere } from 'typeorm';

export abstract class IBaseRepository<T> {
	abstract findOneById(id: number): Promise<T>;
	abstract findOneByCondition(filterCondition: FindOptionsWhere<T>): Promise<T>;
	abstract findAll(): Promise<T[]>;
	abstract createOne(item: T): Promise<T>;
	abstract updateOne(id: number, item: T);
	abstract remove(id: number);
}
