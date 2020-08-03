import * as R from 'ramda';

type LogMaxNumber = (xs: number[]) => void;
const logMaxNumber: LogMaxNumber = R.pipe(
  R.reduce<number, number>(R.max, Number.MIN_VALUE),
  console.log
);

// log: 5
logMaxNumber([1, 2, 3, 4, 5]);
