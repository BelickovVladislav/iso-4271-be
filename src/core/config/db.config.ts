import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

import { ENTITIES } from '../../db/entities';

export const dbFactory = (configService: ConfigService): DataSourceOptions => {
  return {
    type: 'postgres',
    entities: [...ENTITIES],
    database: configService.get('PG_DATABASE'),
    host: configService.get('PG_HOST'),
    port: configService.get('PG_PORT'),
    username: configService.get('PG_USERNAME'),
    password: configService.get('PG_PASSWORD'),
  };
};
