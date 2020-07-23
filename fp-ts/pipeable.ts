import * as fp from 'fp-ts';
import * as assert from 'assert';

/*
when pass `Apply` to `pipeable`, the return functions includes apFirst and apSecond,
whe pass `Monad` to `pipeable`, the return functions includes chainFirst
 */

// `apFirst`, `apSecond` base on `ap` operation, differ from `ap`,
// `apFirst`, `apSecond` force the returned inner value of `effect`(F[_])
// to fixed first(apSecond) or second(apFirst) parameter

const fa = fp.option.some(1);
const fb = fp.option.some(2);
const fc = fp.option.none;

assert.deepEqual(fp.option.apFirst(fa)(fb), fb);
assert.deepEqual(fp.option.apSecond(fa)(fb), fa);
assert.deepEqual(fp.option.apSecond(fa)(fc), fc); // `ap` on `none` always return `none`

// `chainFirst` is a bit like `apFist`, but ignore the value inner `effect`(F[_]) which `fab` return
const chainTo = fp.option.chainFirst((n: number) =>
  n > 0 ? fp.option.some(n) : fp.option.none
);
const fd = chainTo(fp.option.some(1));
const fe = chainTo(fp.option.some(-1));
const ff = chainTo(fp.option.none);

assert.deepEqual(fd, fp.option.some(1));
assert.deepEqual(fe, fp.option.none);
assert.deepEqual(ff, fp.option.none);

/* --- */
