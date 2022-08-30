import { Seeder } from '@concepta/typeorm-seeding';
import { Logger } from '@nestjs/common';

import { UserFactory } from '../factories';

export class UserSeeder extends Seeder {
        private logger: Logger = new Logger(UserSeeder.name);
        async run() {
                try {
                        await this.factory(UserFactory).create();
                } catch (error) {
                        const errorFormat = {
                                code: error.code,
                                // errno: error.errno,
                                sqlMessage: error.sqlMessage,
                                // sqlState: error.sqlState,
                                // index: error.index,
                                sql: error.sql,
                        };
                        this.logger.error(JSON.stringify(errorFormat, null, 2));
                }
        }
}
