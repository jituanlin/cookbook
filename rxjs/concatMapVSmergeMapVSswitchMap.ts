/**
 * */
import { interval, timer } from "rxjs";
import { concatMap, mapTo, mergeMap, switchMap, take } from 'rxjs/operators';

const source$ = interval(1000);

/**
 * description: concatMap will map the outer event to the `inner` observable
 * then **sequentially** concat it to output observable
 * output: 0 0 1 1 2 2 3 3
 * */
const S1 = () => source$.pipe(concatMap(x => [x, x])).subscribe(console.log);

/**
 * description:
 * 1. concatMap will map the outer event to the `inner` observable;
 * 2. then concat it to output observable until new outer event arrive,
 * 3. after that, goto step1
 * output: 0 1 2 3 4 5 6 7 8 0 1 2 3 4
 * */
const S2 = () =>
  source$.pipe(switchMap(x => interval(100))).subscribe(console.log);

/**
 * description:
 * 1. mergeMap will map the outer event to observable then merge it to
 *  output observable.
 * output: 0 1 2 0 1 2
 * */
const S3 = () =>
  source$.pipe(mergeMap(x => interval(100).pipe(take(3)))).subscribe(console.log);

S3()
