import * as R from 'ramda';

const originalData = [[], [1, 2], [3, 4, 5]];

type DataProcessor = (data: number[][]) => number;
const dataProcessor: DataProcessor = R.pipe(
  xs => xs.map(R.length, xs),
  R.tap(x => console.log(x)),
  R.sum
);

console.log('二维数据的所有元素个数为', dataProcessor(originalData));
