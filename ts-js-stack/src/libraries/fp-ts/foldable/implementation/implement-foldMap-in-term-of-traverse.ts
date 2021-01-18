import * as F from 'fp-ts3';
import {Monoid} from 'fp-ts3/Monoid';
import {Kind} from 'fp-ts3/HKT';

const getApplicative4Const = <T>(
  M: F.monoid.Monoid<T>
): F.applicative.Applicative2C<'Const', T> => ({
  of: a => F.const.make(M.empty),
  map: f => fa => F.const.make(fa),
  ap: fa => fab => F.const.make(M.concat(fa)(fab)),
  URI: 'Const',
});

const foldMap: F.foldable.Foldable1<'Option'>['foldMap'] = <M>(
  M: Monoid<M>
) => <A>(f: (a: A) => M) => (fa: Kind<'Option', A>) =>
  F.option.traverse(getApplicative4Const(M))((a: A) => F.const.make(f(a)))(fa);

// log: 2 0
console.log(
  foldMap(F.monoid.monoidSum)((n: number) => n + 1)(F.option.some(1)),
  foldMap(F.monoid.monoidSum)((n: number) => n + 1)(F.option.none)
);
