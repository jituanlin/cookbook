import {traversalArray} from './index';

describe('monocle-ts/reimplement-traversal', () => {
  test('traversalArray.modify', () => {
    expect(traversalArray<number>().modify(n => n + 1)([1, 2])).toEqual([2, 3]);
  });

  test('traversalArray.set', () => {
    expect(traversalArray<number>().set(0)([1, 2])).toEqual([0, 0]);
  });
});
