import { readdirSync } from 'fs';
import { join } from 'path';

const dir = './migrations';

export const MIGRATIONS = readdirSync(dir).reduce((acc, path) => {
  if (path !== 'index.ts') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const scripts = Object.values(require(join(dir, path)));

    acc.push(...scripts);
  }

  return acc;
}, []);
