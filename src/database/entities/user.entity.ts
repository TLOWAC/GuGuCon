import { ApiProperty } from "@nestjs/swagger";
import bcryptjs from "bcryptjs";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import crypto from "crypto";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import { CoreEntity } from "./@core.entity";

@Entity()
export class User extends CoreEntity {
        @ApiProperty({ description: "이름" })
        @Column()
        firstName: string;

        @ApiProperty({ description: "성" })
        @Column()
        lastName: string;

        @ApiProperty({ description: "활성화 여부" })
        @Column({ default: true })
        isActive: boolean;

        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @ApiProperty({ default: "Julie44@yahoo.com", description: "email/nickname 정보" })
        @Column()
        username: string;

        @IsNotEmpty()
        @IsString()
        @MinLength(4)
        @Matches(/^[a-zA-Z0-9]*$/, {
                message: "password only accepts english and number",
        })
        @ApiProperty({ default: "qwer1234", description: "비밀번호" })
        @Column()
        // @Exclude() # module class-transformer 를 사용하여 user 데이터가 반환될떄 해당 Column 은 제외하고 반환한다.
        password: string;

        @ApiProperty({ description: "나이" })
        @Column()
        age: number;

        @ApiProperty({ description: "포인트" })
        @Column()
        point: number;

        @Column()
        @Exclude()
        salt: string;

        @BeforeInsert()
        @BeforeUpdate()
        hashPassword() {
                const salt = bcryptjs.genSaltSync();
                this.password = bcryptjs.hashSync(this.password, salt);
                this.salt = salt;
        }

        validatePassword(password: string) {
                const hashPassword = bcryptjs.hashSync(password, this.salt);
                const isValidPassowrd = bcryptjs.compare(hashPassword, password);
                return isValidPassowrd;
        }

        // * 로그인 > 비밀번호 찾기 | 비밀번호 리셋
        resetPassword() {
                const genPwd = crypto
                        .randomBytes(12)
                        .toString("base64")
                        .replace(/[^A-Za-z0-9]/g, "");

                this.password = genPwd; // Entity[User].hashPassword() 로 인해서 DB 에 insert 될때 hash 된다.
                return genPwd;
        }
}
