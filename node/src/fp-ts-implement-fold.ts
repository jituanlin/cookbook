import {Monoid} from 'fp-ts/Monoid';
import {MonoidSum} from 'fp-ts/number';
import {string} from 'fp-ts';

const fold = <T>(monoid: Monoid<T>, xs: T[]) =>
    xs.reduce(monoid.concat, monoid.empty);

console.log(fold(MonoidSum, [1, 2, 3]));
console.log(fold(string.Monoid, ['1', '2', '3']));
