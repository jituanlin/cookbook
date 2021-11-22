import {rightM} from './monocle-prism-set-only-when-right';
import * as F from 'fp-ts';

describe('prism', () => {
  test('set only when right', () => {
    const setWhenRight = rightM.set(
      F.either.right(42) as F.either.Right<number>
    );
    expect(setWhenRight(F.either.right(40))).toEqual(F.either.right(42));
    expect(setWhenRight(F.either.left('unknown'))).toEqual(
      F.either.left('unknown')
    );
  });
});
