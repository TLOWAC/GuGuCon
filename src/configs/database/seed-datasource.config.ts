import { SeedingSource } from "@concepta/typeorm-seeding";

import { RootSeeder, UserSeeder } from "@/database/seeding/seeds";

import { dataSourceOptions } from "./datasource.config";

export default new SeedingSource({
        dataSource: dataSourceOptions,
        seeders: [UserSeeder],
        defaultSeeders: [RootSeeder],
});
