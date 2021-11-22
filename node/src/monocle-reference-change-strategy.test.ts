import {afterModified, original} from './monocle-reference-change-strategy';

describe('reference change strategy', () => {
  test('original state should not strict equal to afterModified state', () => {
    expect(original).not.toStrictEqual(afterModified);
  });

  test('account should be same', () => {
    expect(original.account).toStrictEqual(afterModified.account);
  });

  test('movie 2020 should be same', () => {
    expect(original.movies[1]).toStrictEqual(afterModified.movies[1]);
  });

  test('movie 1944 should NOT be same', () => {
    expect(original.movies[0]).not.toStrictEqual(afterModified.movies[0]);
  });
});
