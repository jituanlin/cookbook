/**
 * unknown and any is supertype of all types,
 * and they are assignable to each other,
 * so they are TS 's top type.
 *
 * */

// any is assignable to unknown
export type S1 = any extends unknown ? 1 : 0;

// unknown is assignable to any
export type S2 = unknown extends any ? 1 : 0;
