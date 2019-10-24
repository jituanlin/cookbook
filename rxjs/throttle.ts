/**
 * throttle do:
 * 1. emit one event;
 * 2. ignore sequence output until inner observable complete or emit;
 * 3. goto step1
 * */
import { interval, timer } from "rxjs";
import { throttle, throttleTime } from "rxjs/operators";

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
