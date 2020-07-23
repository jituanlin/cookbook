import {interval, timer} from 'rxjs';
import {audit, auditTime, timeout} from 'rxjs/operators';

const source$ = interval(1000);

/**
 * input:
 * source$: 0 1 2 3 4 5 6 ...
 * output:
 * after audit: 2 4 6 ...
 * */

const S1 = () => source$.pipe(auditTime(2000)).subscribe(console.log);

/**
 * input:
 * source$: 0 1 2 3 4 5 6 ...
 * output:
 * after audit: 1 3 5 7 ...
 *
 * why?
 *
 * */
const S2 = () => source$.pipe(audit(() => timer(2000))).subscribe(console.log);

/**
 * input:
 * source$: 0 1 2 3 4 5 6 ...
 * output:
 * after audit: 2 5 7 10 ...
 *
 * why?
 *
 * */
const S3 = () => source$.pipe(audit(() => timer(2002))).subscribe(console.log);

/**
 * input:
 * source$: 0 1 2 3 4 5 6 ...
 * output:
 * after audit: 1 3 5 7 ...
 *
 * why?
 *
 * */
const S4 = () => source$.pipe(audit(() => timer(1800))).subscribe(console.log);

/**
 * OK, the `timer` in nodejs mean:
 * `at least time pass`,
 * the extra delay depend on event loop status;
 * let us choose more clear time interval to avoid confuse case
 * */

const source2$ = interval(100);

/**
 * output: 9 19 29 39 ...
 * */
const S5 = () => source2$.pipe(audit(() => timer(1000))).subscribe(console.log);

/**
 * output: 9 19 29 39 ...
 * same as S5
 * */
const S6 = () => source2$.pipe(auditTime(1000)).subscribe(console.log);
