import { Factory } from '@concepta/typeorm-seeding';
import { faker } from '@faker-js/faker';

import { User } from '@@database/entities';

export class UserFactory extends Factory<User> {
        protected async entity(): Promise<User> {
                const user = new User();
                user.username = faker.internet.email();
                user.firstName = '';
                user.lastName = '';
                user.isActive = true;
                user.password = 'asdf';
                user.age = 20;
                user.point = 10;
                return user;
        }
}
