import {quickSort} from './index';

describe('qucik-sort/index', () => {
  test('basic test', () => {
    const array = [2, 1, 4, 5];
    expect(quickSort(array, 0, 3)).toEqual(array.sort((a, b) => a - b));
  });
});
