import {MonoidSum} from 'fp-ts/number';
import {option} from 'fp-ts';
import {foldMap} from './fp-ts-implement-foldmap-in-terms-of-traverse';

describe('foldMap on option', () => {
  it('should apply the computation on `some`', function () {
    expect(foldMap(MonoidSum)(option.some(1), (n: number) => n + 1)).toEqual(2);
  });

  it('should return Monoid.empty on `none`', function () {
    expect(foldMap(MonoidSum)(option.none, (n: number) => n + 1)).toEqual(0);
  });
});
