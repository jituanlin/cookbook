/**
 * @see https://typelevel.org/cats/datatypes/const.html#example-2-traverse
 *
 * Traversing over a collection with an effectful function is more general
 * than traversing over a collection to reduce it down to a single value.
 *
 * We can see traverse as a function that goes over a collection,
 * applying an effectful function to each value,
 * and combining all of these effectful values.
 *
 * In `foldMap` case, the effect is mapping each value to a value of type `B`.
 * And we know how to combine `B`s via its Monoid instance.
 *
 * The Monoid instance is exactly what is used when traverse goes to collect the effectful values together.
 * */
import * as assert from "assert";
import * as const_ from "fp-ts/Const";
import { Foldable1 } from "fp-ts/Foldable";
import { Kind } from "fp-ts/HKT";
import { Monoid } from "fp-ts/Monoid";
import { MonoidSum } from "fp-ts/number";
import { option } from "fp-ts";

const foldMap: Foldable1<"Option">["foldMap"] =
  <M>(M: Monoid<M>) =>
  <A>(fa: Kind<"Option", A>, f: (a: A) => M) =>
    option.traverse(const_.getApplicative(M))((a: A) => const_.make(f(a)))(fa);

assert.deepStrictEqual(
  foldMap(MonoidSum)(option.some(1), (n: number) => n + 1),
  2
);
