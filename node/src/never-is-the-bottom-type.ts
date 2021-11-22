/**
 * output: 1
 * never is subtype of all type (include itself)
 * see: https://en.wikipedia.org/wiki/Bottom_type
 * */
export type S1 = never extends any ? 1 : 0;
export type S2 = never extends never ? 1 : 0;
