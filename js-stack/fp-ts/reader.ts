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

const r2 = fp.reader.of<void, number>(42); // the `of` constructs a Reader that without dependency and fixed result
assert.deepStrictEqual(r2(), 42);

const r3 = fp.reader.ask<string>(); // the `ask` construct a reader that return it's dependency as it's computation result
assert.deepStrictEqual(r3('one'), 'one');

const r4 = fp.reader.asks((n: number) => String(n)); // just define function: R => A directly
assert.deepStrictEqual(r4(1), '1');
