import * as TT from 'ts-toolbelt';
import * as _ from 'lodash';

const pipeline = <T>(value: T) => <
  F extends [TT.F.Function<[T]>, ...TT.F.Function[]]
>(
  ...fns: TT.F.Piper<F>
): TT.F.Return<TT.T.Last<F>> =>
  _.reduce(fns, (acc, fn) => fn(acc), value) as TT.F.Return<TT.T.Last<F>>;
