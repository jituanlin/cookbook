import * as fp from 'fp-ts';

type LogGreatestNumber = (xs: number[]) => fp.io.IO<void>;
const logGreatestNumber: LogGreatestNumber = fp.function.flow(
  fp.nonEmptyArray.max(fp.ord.ordNumber),
  fp.console.log
);

const main: fp.io.IO<void> = logGreatestNumber([1, 2, 3, 4, 5]);

/*
log: 5
note: The entry point of the program is the only place where side effects are allowed
*/
main();
