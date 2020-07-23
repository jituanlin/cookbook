/**
 * Compare:
 *                  throttle                                            auditTime
 *
 * Metaphor       Killer who likes to let go of someone                 Killer who like kill all but let latest go
 *                and kill the rest
 *
 * Step           1. emit one event;                                    1. auditTime ignore all events during period;
 *                2. ignore sequence output until                       2. after time go pass;
 *                   inner observable complete or emit value;           3. then output the last event during that period;
 *                3. goto step1                                         4. then goto step 1;
 *
 *
 * Difference     emit value first then                                 silence during period first
 *                silence during period                                 then emit latest value.
 * */
import {interval, timer} from 'rxjs';
import {throttle, throttleTime} from 'rxjs/operators';

const source$ = interval(100);

/**
 * output: 0 10 20 30...
 * */
const S1 = () => source$.pipe(throttleTime(1000)).subscribe(console.log);

/**
 * output: 0 11 21 31...
 * */
const S2 = () =>
  source$.pipe(throttle(() => timer(1000))).subscribe(console.log);
