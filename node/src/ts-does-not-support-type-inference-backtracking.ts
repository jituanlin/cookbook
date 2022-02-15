import * as R from 'ramda';

const f = <T extends number | string>(x: T): T => x;
/**
 * TS cannot infer f as `unknown => number` because of it cannot infer type from back to front.
 * */
const f2 = R.pipe(f, R.inc); // `f2` will be inferred as `unknown => number` because `f`'s type `T` is unknown when `f`
                             // is passed to `R.pipe`
const r = f2('1'); // type compatible, but will throw run-time error
