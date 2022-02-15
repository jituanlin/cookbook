/**
 * `Reader<E,A>` is an alias of `ReaderT<Id,E,A>`.
 * Furthermore, `ReaderT<Id,E,A>` is also called Kleisli category.
 * Kleisli is essentially `A => F[B]`(in Scala) where `F` is a kind of `*->*`.
 * The Kleisli is useful for compose functions(`A => F[B]`) which return value wrap in `Effect`(`F`).
 * General speaking, `Reader` represent computation with dependency.
 * */
import * as assert from 'assert';
import {reader} from 'fp-ts';

const r1: reader.Reader<number, string> = (n: number) => `number is ${n}`; // the `Reader` is a function of type `R=>A`
assert.deepStrictEqual(r1(1), `number is ${1}`);

// The `ask` construct a `reader` that returns its dependency as the result of the computation
const r3 = reader.ask<string>();
assert.deepStrictEqual(r3('one'), 'one');

// Same as unary function
const r4 = reader.asks((n: number) => String(n));
assert.deepStrictEqual(r4(1), '1');

// The `of` constructs a `reader` with no dependency and the result is fixed
const r2 = reader.of<void, number>(42);
assert.deepStrictEqual(r2(), 42);
