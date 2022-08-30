import * as dotenv from 'dotenv';
import { cwd, env } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

import { defaultOrmConfigOptions } from './defaultOrmConfig';

dotenv.config();

export const dataSource = new DataSource(defaultOrmConfigOptions);
