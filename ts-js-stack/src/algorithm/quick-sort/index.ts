/**
 * Time complexity of quicksort is:
 *  - O(𝑛lg𝑛) in best situation
 *  - n*n in worst situation
 * Quicksort main logic:
 *  1. select a `pivotIdx`, according that `pivotIdx` `partition` array to two parts,
 *     all element smart than pivot value is arrange in it's left, greater is arrange in it's right.
 *  2. `partition` those two part.
 * How to `partition`:
 *  1. swap pivot to rightest position, initial `sortedIdx` to left,
 *     `sortedIdx` is used to maintain state: all element left it
 *     is smart than pivot.
 *  2. for each element from left to right -1, if it smart than
 *     pivot, swap it to `sortedIdx`, and `sortedIdx + = 1`
 *  3. now, all elements small pivot is arrange in `sortedIdx` left,
 *  it's time to swap rightest element back to `sortedIdx` position.
 * */
const swap = (array: number[], idxA: number, idxB: number) => {
  const tmp = array[idxA];
  array[idxA] = array[idxB];
  array[idxB] = tmp;
};

const partition = (
  array: number[],
  left: number,
  right: number,
  pivotIdx: number
) => {
  let sortedIdx = left;
  const pivotValue = array[pivotIdx];
  swap(array, pivotIdx, right);
  for (let idx = left; idx < right; idx += 1) {
    if (array[idx] <= pivotValue) {
      swap(array, sortedIdx, idx);
      sortedIdx += 1;
    }
  }

  swap(array, sortedIdx, right);
  return sortedIdx;
};

export const quickSort = (array: number[], left: number, right: number) => {
  if (right > left) {
    const pivotIdx = Math.floor((left + right) / 2);
    const newPivot = partition(array, left, right, pivotIdx);
    quickSort(array, left, newPivot - 1);
    quickSort(array, newPivot + 1, right);
  }
  return array;
};
