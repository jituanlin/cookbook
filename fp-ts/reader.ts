/**
 * `Reader<E,A>` is an alias for `ReaderT<Id,E,A>`,
 * further more, `ReaderT<Id,E,A>` is also called Kleisli category
 * Kleisli is essentially `A => F[B]`(in Scala) where `F` is
 * kind of `*->*`
 * The Kleisli is useful for compose functions(`A => F[B]`) which
 * return value wrap in `Effect`(`F`);
 * For now, we just discuss `Reader`, `ReaderT`(or Kleisli)
 * will be discuss in another independent chapter;
 * general speaking, `Reader` represent computation with dependency 
 * */
import * as fp from "fp-ts";
import * as assert from 'assert'

/* construct a reader */
// The Reader is just function of type `R=>A`,so
const r1:fp.reader.Reader<number,string> = (n:number) => `number is ${n}`
assert.deepEqual(r1(1),`number is ${1}`)

// the `of` constructs a Reader that without dependency and fixed result
const r2 = fp.reader.of<void,number>(42)
assert.deepEqual(r2(),42)

// todo: I ask
const
/* --- */
