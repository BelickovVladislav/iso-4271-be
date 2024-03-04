import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { dbFactory } from '@core/config';

import { MIGRATIONS } from './migrations';

config();

const configService = new ConfigService();
export default new DataSource({
  ...dbFactory(configService),
  logger: 'simple-console',
  logging: ['error'],
  migrations: MIGRATIONS,
});
