import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        firstName: string;

        @Column()
        lastName: string;

        @Column({ default: true })
        isActive: boolean;

        @Column()
        username: string;

        @Column()
        password: string;

        @Column()
        age: number;

        @Column()
        point: number;
}
