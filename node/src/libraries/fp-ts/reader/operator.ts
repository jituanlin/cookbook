import * as fp from 'fp-ts';
import assert from 'assert';

const r2 = fp.reader.of<void, number>(42); // the `of` constructs a Reader that without dependency and fixed result
assert.deepStrictEqual(r2(), 42);
