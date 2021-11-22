/**
 * `Reader<E,A>` is an alias of `ReaderT<Id,E,A>`.
 * Further more, `ReaderT<Id,E,A>` is also called Kleisli category.
 * Kleisli is essentially `A => F[B]`(in Scala) where `F` is a kind of `*->*`.
 * The Kleisli is useful for compose functions(`A => F[B]`) which return value wrap in `Effect`(`F`).
 * General speaking, `Reader` represent computation with dependency.
 * */
import * as fp from 'fp-ts';
import * as assert from 'assert';

const r1: fp.reader.Reader<number, string> = (n: number) => `number is ${n}`; // the `Reader` is a function of type `R=>A`
assert.deepStrictEqual(r1(1), `number is ${1}`);

const r3 = fp.reader.ask<string>(); // the `ask` construct a reader that return it's dependency as it's computation result
assert.deepStrictEqual(r3('one'), 'one');

const r4 = fp.reader.asks((n: number) => String(n)); // just define function: R => A directly
assert.deepStrictEqual(r4(1), '1');

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
