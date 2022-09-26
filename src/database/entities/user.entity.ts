import { ApiProperty } from "@nestjs/swagger";
import bcryptjs from "bcryptjs";
import { classToPlain, classToPlainFromExist, Exclude } from "class-transformer";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
        @ApiProperty({ description: "id" })
        @PrimaryGeneratedColumn()
        id: number;

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

        // https://stackoverflow.com/questions/50360101/how-to-exclude-entity-field-from-returned-by-controller-json-nestjs-typeorm
        // user 데이터 반환시 JSON 데이터에 몇몇 Column 들을 제외하고 반환하고 싶은 경우.
        // module[class-transformer] 의 @Exclude() 를 사용하고 classToPlain 을 사용한다. ( @Exclude() 만 사용하는 방법도 있다. )
        // toJSON() 함수를 만들어서 보다 명시적으로 사용하고자 하는것으로 지금은 추측 된다.

        validatePassword(password: string) {
                const hashPassword = bcryptjs.hashSync(password, this.salt);
                const isValidPassowrd = bcryptjs.compare(hashPassword, password);
                return isValidPassowrd;
        }
}
