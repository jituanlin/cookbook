import {Applicative2C} from 'fp-ts/lib/Applicative';
import {Monoid} from "fp-ts/Monoid";
import {Foldable1} from "fp-ts/Foldable";
import { option } from 'fp-ts';
import {Kind} from "fp-ts/HKT";

const getApplicative4Const = <T>(
  M: Monoid<T>
): Applicative2C<'Const', T> => ({
  of: a => const.make(M.empty),
  map: f => fa => const.make(fa),
  ap: fa => fab => const.make(M.concat(fa)(fab)),
  URI: 'Const',
});

const foldMap: Foldable1<'Option'>['foldMap'] = <M>(
  M: Monoid<M>
) => <A>(f: (a: A) => M) => (fa: Kind<'Option', A>) =>
  option.traverse(getApplicative4Const(M))((a: A) => const.make(f(a)))(fa);

// log: 2 0
console.log(
  foldMap(F.monoid.monoidSum)((n: number) => n + 1)(F.option.some(1)),
  foldMap(F.monoid.monoidSum)((n: number) => n + 1)(F.option.none)
);
