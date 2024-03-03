export type ClassType<T = unknown> = new (...args: unknown[]) => T;

export type AbstractClassType<T = unknown> = abstract new (...args: []) => T;
