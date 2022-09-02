import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
        @ApiProperty({ description: 'id' })
        @PrimaryGeneratedColumn()
        id: number;

        @ApiProperty({ description: '이름' })
        @Column()
        firstName: string;

        @ApiProperty({ description: '성' })
        @Column()
        lastName: string;

        @ApiProperty({ description: '활성화 여부' })
        @Column({ default: true })
        isActive: boolean;

        @ApiProperty({ description: '닉네임' })
        @Column()
        username: string;

        @ApiProperty({ description: '비밀번호' })
        @Column()
        password: string;

        @ApiProperty({ description: '나이' })
        @Column()
        age: number;

        @ApiProperty({ description: '포인트' })
        @Column()
        point: number;
}
