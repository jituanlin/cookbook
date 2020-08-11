import {Traversal, traversalArray} from './index';

test('traversalArray.modify', () => {
  expect(traversalArray<number>().modify(n => n + 1)([1, 2])).toEqual([2, 3]);
});

test('traversalArray.set', () => {
  expect(traversalArray<number>().set(0)([1, 2])).toEqual([0, 0]);
});
