/**
 * */
import {interval} from 'rxjs';
import {concatMap, mergeMap, switchMap, take} from 'rxjs/operators';

const source$ = interval(1000);

/**
 * output: 0 0 1 1 2 2 3 3
 * */
const S1 = () => source$.pipe(concatMap(x => [x, x])).subscribe(console.log);

/**
 * output: 0 1 2 3 4 5 6 7 8 0 1 2 3 4
 * */
const S2 = () =>
    source$.pipe(switchMap(x => interval(100))).subscribe(console.log);

/**
 * output: 0 1 2 0 1 2
 * */
const S3 = () =>
    source$
        .pipe(mergeMap(x => interval(100).pipe(take(3))))
        .subscribe(console.log);

S3();
