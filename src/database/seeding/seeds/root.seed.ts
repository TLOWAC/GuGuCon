import { Seeder } from "@concepta/typeorm-seeding";

import { User } from "@/database/entities";

import { UserFactory } from "../factories";
import { UserSeeder } from "./user.seed";

export class RootSeeder extends Seeder {
        async run() {
                const seedUser = new UserSeeder({
                        factories: [
                                new UserFactory({
                                        entity: User,
                                }),
                        ],
                });

                await this.call([seedUser]);
                return;
        }
}
