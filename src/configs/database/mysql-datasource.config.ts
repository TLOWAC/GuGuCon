import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { dataSourceOptions } from './datasource.config';

dotenv.config();

export const dataSource = new DataSource(dataSourceOptions);
