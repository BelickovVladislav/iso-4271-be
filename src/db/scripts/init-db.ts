import type { QueryResultRow } from 'pg';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import AppDataSource from '../data-source';

class InitDB {
  static logger: Logger = new Logger(InitDB.name);
  private readonly _dataSource: DataSource;
  private readonly _database: string;

  constructor() {
    const { options } = AppDataSource;

    this._database = options.database as string;

    this._dataSource = new DataSource({
      ...AppDataSource.options,
      database: 'template1',
    } as PostgresConnectionOptions);
  }

  async execute(): Promise<void> {
    await this._connection();
    await this._createDBIfNotExists();
    await this._disconnect(0);
  }

  private async _createDBIfNotExists(): Promise<void> {
    try {
      const result = await this._dataSource.query(
        'SELECT datname FROM pg_database',
      );
      const isExists = result.some(
        (row: QueryResultRow) => row['datname'] === this._database,
      );

      if (!isExists) {
        await this._dataSource.query(`CREATE DATABASE ${this._database}`);

        return InitDB.logger.log('Project DB has been created.');
      }

      InitDB.logger.log('Project DB already exists.');
    } catch (e) {
      InitDB.logger.error(`QUERY FAILED: ${e}`);
      await this._disconnect(1);
    }
  }

  private async _disconnect(code: number): Promise<void> {
    await this._dataSource.destroy();
    process.exit(code);
  }

  private async _connection(): Promise<void> {
    try {
      await this._dataSource.initialize();
      InitDB.logger.log('Connected');
    } catch (e) {
      InitDB.logger.error(`CONNECTION ERROR: ${e}`.replace(' error: ', ' '));
      await this._disconnect(1);
    }
  }
}

new InitDB().execute();
