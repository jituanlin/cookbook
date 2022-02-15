/**
 * `State monad` represents a computation depend on a state with and may mutate that state.
 * But in functional programming, mutation is side effect and breaks the transparency reference.
 * So we maintain that state explicitly by accept it as parameter and return it along with computation result.
 * The form: (S)=>[S,A] is classifies those computations, the `S` is state, the A is result of computation.
 * Furthermore, the state monad provide some useful functions to
 * make compose/construct that kind of computation more conveniently.
 */
import {pipe} from 'fp-ts/function';
import * as fp from 'fp-ts';
import {state} from 'fp-ts';
import assert from 'assert';

export const appendContent = pipe(
    state.gets((content: string) => content.split('\n').length),
    state.chain(lineCount => content => [lineCount + 1, content + '\n1'])
);

// the `get` function constructs a state monad whose computation result same as state passed to
const f1 = state.get();
assert.deepStrictEqual(f1(1), [1, 1]);

// the `put` function constructs a state monad whose state be fixed by argument passed to
const f2 = state.put(1);
assert.deepStrictEqual(f2(3), [undefined, 1]);

// the `modify` function constructs a state monad whose state be `modify` by function passed to
const f3 = state.modify((n: number) => n + 1);
assert.deepStrictEqual(f3(4), [undefined, 5]);

// The `gets` function constructs a state monad which get result by passed state
const f4 = state.gets((n: number) => n + 1);
assert.deepStrictEqual(f4(3), [4, 3]);

// get the result of computation
const f5 = state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.evaluate(1)(f5), 2);

// get the current state
const f6 = state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.execute(1)(f6), 1);

assert.deepStrictEqual(state.execute('')(appendContent), '\n1');
assert.deepStrictEqual(state.evaluate('')(appendContent), 2);
