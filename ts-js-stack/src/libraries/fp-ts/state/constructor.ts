import * as fp from 'fp-ts';
import * as assert from 'assert';

const f1 = fp.state.get(); // the `get` function constructs a state monad whose computation result same as state passed to
assert.deepStrictEqual(f1(1), [1, 1]);

const f2 = fp.state.put(1); // the `put` function constructs a state monad whose state be fixed by argument passed to
assert.deepStrictEqual(f2(3), [undefined, 1]);

const f3 = fp.state.modify((n: number) => n + 1); // the `modify` function constructs a state monad whose state be `modify` by function passed to
assert.deepStrictEqual(f3(4), [undefined, 5]);

const f4 = fp.state.gets((n: number) => n + 1); // The `gets` function constructs a state monad which get result by passed state
assert.deepStrictEqual(f4(3), [4, 3]);

const f5 = fp.state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.evaluate(1)(f5), 2); // get the compute result

const f6 = fp.state.gets((n: number) => n + 1);
assert.deepStrictEqual(fp.state.execute(1)(f6), 1); // get the current state
