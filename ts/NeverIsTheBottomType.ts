/**
 * output: 1
 * never is subtype of other type (include itself)
 * see: https://en.wikipedia.org/wiki/Bottom_type
 * */
type S1 = never extends any ? 1 : 0;
type S2 = never extends never ? 1 : 0;

