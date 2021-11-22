/**
 * It's a use case of ts-toolbelt's `Piper` type.
 * */
import * as TT from 'ts-toolbelt';

const pipeline = <T>(value: T) => <
  F extends [TT.F.Function<[T]>, ...TT.F.Function[]]
>(
  ...fns: TT.F.Piper<F>
): TT.F.Return<TT.T.Last<F>> =>
  fns.reduce((acc, fn) => fn(acc), value) as TT.F.Return<TT.T.Last<F>>;
