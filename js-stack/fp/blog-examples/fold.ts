import * as fp from 'fp-ts';

const fold = <T>(monoid: fp.monoid.Monoid<T>, xs: T[]) =>
  xs.reduce(monoid.concat, monoid.empty);

console.log(fold(fp.monoid.monoidSum, [1, 2, 3]));
console.log(fold(fp.monoid.monoidString, ['1', '2', '3']));
