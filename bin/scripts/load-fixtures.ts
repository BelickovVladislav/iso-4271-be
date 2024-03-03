import type { DataSource, EntityManager } from 'typeorm';
import { Logger } from '@nestjs/common';

import type { AbstractLoader } from '@fixtures/abstract-loader';
import { LOADERS } from '@fixtures/loaders';
import type { ClassType } from '@models/types';

import AppDataSource from '../../data-source';

class FixtureLoader {
  // TODO
  readonly #loaders: ClassType<AbstractLoader<object>>[] = LOADERS as [];

  readonly #logger: Logger = new Logger(FixtureLoader.name);

  async execute(): Promise<void> {
    try {
      this.#logger.verbose('Run fixtures');

      const connection = await FixtureLoader.#createConnections();

      await connection.transaction(async (entityManager: EntityManager) => {
        for (const constructor of this.#loaders) {
          const loader = new constructor();

          await loader.setEntityManager(entityManager).execute();
        }
      });

      this.#logger.verbose('Fixtures successfully loaded.');

      process.exit(0);
    } catch (e) {
      console.log(e);

      // TODO
      if (e instanceof Error && 'parameters' in e) {
        this.#logger.error(
          `Failed loading fixtures. Error: message - ${
            e.message
          }, parameters - ${((e.parameters as []) ?? []).join(', ')}.`,
        );
      }

      process.exit(1);
    }
  }

  static async #createConnections(): Promise<DataSource> {
    return AppDataSource.initialize();
  }
}

new FixtureLoader().execute();
