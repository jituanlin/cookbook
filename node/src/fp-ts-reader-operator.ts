import assert from 'assert';
import {reader} from 'fp-ts';

const r2 = reader.of<void, number>(42); // the `of` constructs a Reader that without dependency and fixed result
assert.deepStrictEqual(r2(), 42);
