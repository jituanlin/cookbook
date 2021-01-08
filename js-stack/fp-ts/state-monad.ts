/**
 * `State monad` is used to represent a computation which depend on a state and may mutate that state.
 * But in functional programming, mutate is side effect and break the transparency reference.
 * So we maintain that state explicitly, all computation depend on or mutate it
 * should accept it as parameter and return it along with computation result.
 * So, we ues form: (S)=>[S,A] to classify those computation, the `S` is state, the A is result of computation.
 * Further more, the state monad provide some useful functions to
 * enable us compose/construct that kind of computation more conveniently.
 */

import * as fp from 'fp-ts';
import * as assert from 'assert';

const f = fp.state.of(1); // the `of` function constructs a state monad whose computation result fixed by argument passed to
assert.deepStrictEqual(f([]), [1, []]);

const f1 = fp.state.get(); // the `get` function constructs a state monad whose computation result same as state passed to
assert.deepStrictEqual(f1(1), [1, 1]);

const f2 = fp.state.put(1); // the `put` function constructs a state monad whose state be fixed by argument passed to
assert.deepStrictEqual(f2(3), [undefined, 1]);

const f3 = fp.state.modify((n: number) => n + 1); // the `modify` function constructs a state monad whose state be `modify` by function passed to
assert.deepStrictEqual(f3(4), [undefined, 5]);

const f4 = fp.state.gets((n: number) => n + 1); // The `gets` function constructs a state monad which get result by passed state
assert.deepStrictEqual(f4(3), [4, 3]);

/**
 * State monad just a computation depend on a state.
 * We need to run it to get compute result or current state.
 **/

const f5 = fp.state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.evalState(f5, 1), 2); // get the compute result

const f6 = fp.state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.execState(f6, 1), 1); // get the current state

const t1 = fp.state.of<number, number>(1);
const f7 = fp.state.map((n: number) => n + 1)(t1); // the `map` operation modifies the computation result and left state not touched
assert.deepStrictEqual(f7(20), [2, 20]);

const t2 = fp.state.gets<number[], number>(ns => ns[ns.length - 1]);
const f8 = fp.state.chain((a: number) => (s: number[]) => [
  a + 1,
  s.concat(a + 1),
])(t2); // the use case of `chain` is when we need to perform a computation which need another monad's result and state same time
assert.deepStrictEqual(f8([0]), [1, [0, 1]]);

/**
 * `ap` operator execute flow:
 *        state
 *          |
 *         fab
 *       /    \
 *      a->b   a
 *      |      |
 *      |      fa
 *      |      | \
 *      \      a  s
 *       \   /    |
 *       [ b,     a]
 *
 **/
