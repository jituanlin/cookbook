import * as R from 'ramda';

type LogGeatestNumber = (xs: number[]) => void;
const logGeatestNumber: LogGeatestNumber = R.pipe(
  R.reduce<number, number>(R.max, Number.MIN_VALUE),
  console.log
);

// log: 5
logGeatestNumber([1, 2, 3, 4, 5]);
