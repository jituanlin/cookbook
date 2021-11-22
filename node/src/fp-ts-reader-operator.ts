import * as fp from 'fp-ts';
import assert from 'assert';

const r2 = fp.reader.of<void, number>(42); // the `of` constructs a Reader that without dependency and fixed result
assert.deepStrictEqual(r2(), 42);

/**
 * State monad just a computation depend on a state.
 * We need to run it to get compute result or current state.
 **/
const f = fp.state.of(1); // the `of` function constructs a state monad whose computation result fixed by argument passed to
assert.deepStrictEqual(f([]), [1, []]);

const t1 = fp.state.of<number, number>(1);
const f7 = fp.state.map((n: number) => n + 1)(t1); // the `map` operation modifies the computation result and left state not touched
assert.deepStrictEqual(f7(20), [2, 20]);

const t2 = fp.state.gets<number[], number>(ns => ns[ns.length - 1]);
const f8 = fp.state.chain((a: number) => (s: number[]) => [
  a + 1,
  s.concat(a + 1),
])(t2); // the use case of `chain` is when we need to perform a computation which need another monad's result and state same time
assert.deepStrictEqual(f8([0]), [1, [0, 1]]);
