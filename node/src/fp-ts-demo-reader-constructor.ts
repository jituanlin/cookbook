/**
 * `Reader<E,A>` is an alias for `ReaderT<'id',E,A>`.
 * ReaderT(aka Kleisli) is essentially `A => F[B]`(Scala syntax) where `F` is kind of `*->*`.
 * Kleisli is useful for combining functions(`A => F[B]`) whose return value is wrapped in `Effect`(`F`).
 * In general, `Reader` represents computation with dependency.
 * */
import assert from "assert";
import { reader } from "fp-ts";

{
  // `Reader` is a function of type `R=>A`.
  const r: reader.Reader<number, string> = (n: number) => `number is ${n}`;
  assert.deepStrictEqual(r(0), `number is ${0}`);
}

{
  // `ask` constructs a `Reader` that returns its dependency as result.
  assert.deepStrictEqual(reader.ask<string>()(""), "");
}

{
  // `asks` declares a unary function.
  assert.deepStrictEqual(reader.asks((n: number) => String(n))(0), "0");
}

{
  // `of` constructs a `Reader` with no dependency and the result is fixed.
  assert.deepStrictEqual(reader.of<void, number>(0)(), 0);
}
