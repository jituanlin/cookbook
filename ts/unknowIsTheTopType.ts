import * as fp from 'fp-ts'

/**
 * description:
 * any type is subtype of unknown
 * */
export type S1 = any extends unknown ? 1 : 0;

export type S2 = unknown extends unknown ? 1 : 0;

export type S3 = number extends unknown ? 1 : 0;
