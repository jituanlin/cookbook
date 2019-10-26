/**
 * description:
 * any type is subtype of unknown
 * */
type S1 = any extends unknown ? 1 : 0;

type S2 = unknown extends unknown ? 1 : 0;

type S3 = number extends unknown ? 1 : 0;
