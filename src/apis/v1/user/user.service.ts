import {
        BadRequestException,
        Injectable,
        Logger,
        NotFoundException,
        UseFilters,
} from '@nestjs/common';
import bcryptjs from 'bcryptjs';
import { FindOptionsWhere } from 'typeorm';

import { User } from '@@database/entities';
import { UserRepository } from '@@database/repositories';

import { JwtValidateDTO, RegisterUserDTO } from '../auth/dto';
@Injectable()
export class UserService {
        private logger: Logger = new Logger(UserService.name);
        // constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
        constructor(private userRepository: UserRepository) {}

        // async registerUserByEmail() {}

        /**
         * 소셜 계정을 통한 사용자 회원가입
         */
        // async registerUserBySocial() {}

        async findUserByEmail({ username }: { username: string }) {
                try {
                        const user = await this.userRepository.getUserBy({ username });
                        if (user) {
                                return user;
                        }
                        throw new NotFoundException('user not found');
                } catch (e) {
                        this.logger.error(e);
                }
        }

        async findOneUserByOption(options: FindOptionsWhere<User>) {
                try {
                        const user = await this.userRepository.getUserBy(options);
                        if (user) {
                                return user;
                        }
                        throw new NotFoundException('user not found');
                } catch (e) {
                        this.logger.error(e);
                }
        }

        /**
         * 해당 유저가 기존/신규 인지 체크 합니다.
         *
         * @param {object} options
         * @param {object} options.username     사용자 식별정보
         * @returns {boolean}                   true : 기존 유저, false : 신규 유저
         */
        async checkUserExisted(options: { username: string }) {
                try {
                        const { username } = options;
                        const isRegisterUser = await this.userRepository.getUserBy({ username });
                        if (isRegisterUser) {
                                return true;
                        }
                        return false;
                } catch (e) {
                        this.logger.error(e);
                }
        }

        async createUser(registerUserDto: RegisterUserDTO) {
                try {
                        const { username, password } = registerUserDto;

                        const isUserExisted = this.checkUserExisted({ username });

                        if (isUserExisted) {
                                throw new BadRequestException('이미 회원가입한 유저 입니다.');
                        }

                        const salt = bcryptjs.genSaltSync();
                        const hashedPassword = bcryptjs.hashSync(password, salt);

                        const user = await this.userRepository.createUser({
                                id: 1,
                                isActive: false,
                                username,
                                password: hashedPassword,
                                firstName: 'firstName',
                                lastName: 'lastName',
                                age: 20,
                                point: 100,
                        });
                        return user;
                } catch (e) {
                        this.logger.error(e);
                }
        }
}
