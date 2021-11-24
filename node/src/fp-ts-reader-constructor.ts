/**
 * `Reader<E,A>` is an alias of `ReaderT<Id,E,A>`.
 * Further more, `ReaderT<Id,E,A>` is also called Kleisli category.
 * Kleisli is essentially `A => F[B]`(in Scala) where `F` is a kind of `*->*`.
 * The Kleisli is useful for compose functions(`A => F[B]`) which return value wrap in `Effect`(`F`).
 * General speaking, `Reader` represent computation with dependency.
 * */
import * as assert from 'assert';
import {reader} from 'fp-ts';

const r1: reader.Reader<number, string> = (n: number) => `number is ${n}`; // the `Reader` is a function of type `R=>A`
assert.deepStrictEqual(r1(1), `number is ${1}`);

const r3 = reader.ask<string>(); // the `ask` construct a reader that return it's dependency as it's computation result
assert.deepStrictEqual(r3('one'), 'one');

const r4 = reader.asks((n: number) => String(n)); // just define function: R => A directly
assert.deepStrictEqual(r4(1), '1');
