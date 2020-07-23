import * as fp from 'fp-ts';

/**
 * description:
 * unknown is supertype of all types.
 * */
export type S1 = any extends unknown ? 1 : 0;

export type S2 = unknown extends unknown ? 1 : 0;

export type S3 = number extends unknown ? 1 : 0;
