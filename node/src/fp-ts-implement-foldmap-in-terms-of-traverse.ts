/**
 * @see https://typelevel.org/cats/datatypes/const.html#example-2-traverse
 *
 * Summary: traverse-ing over a collection with an effectful function is more general
 * than traversing over a collection to reduce it down to a single value.
 *
 * Detail: we can see traverse is a function that goes over a collection,
 * applying an effectful function to each value,
 * and combining all of these effectful values.
 * In our case, the effect is mapping each value to a value of type B,
 * where we know how to combine Bs via its Monoid instance.
 * The Monoid instance is exactly what is used when traverse goes to collect the effectful values together.
 * Should the F[A] be “empty”, it can use Monoid#empty as a value to return back.
 * */
import {Monoid} from 'fp-ts/Monoid';
import {Foldable1} from 'fp-ts/Foldable';
import {option} from 'fp-ts';
import {Kind} from 'fp-ts/HKT';
import * as const_ from 'fp-ts/Const';

export const foldMap: Foldable1<'Option'>['foldMap'] =
  <M>(M: Monoid<M>) =>
  <A>(fa: Kind<'Option', A>, f: (a: A) => M) =>
    option.traverse(const_.getApplicative(M))((a: A) => const_.make(f(a)))(fa);
