/**
 * Metaphor: The composition of Apple phone, combine latest tech to one phone.
 *
 *Compare:
 *              withLatestFrom                      combineLatest
 * Same:        Combine more than one observable into new observable which
 *              emit latest value from each observable
 *
 *              All observable emit at least one value is required condition for
 *              result observable emit value
 *
 *
 * Difference:  **source observable emit**          **any observable emit**
 *              is required condition for           is required condition for
 *              result observable emit value        result observable emit value
 *
 *
 * */
import { combineLatest, interval } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

const ob = interval(2000);
const ob2 = interval(1000);
// [0,0] [1,2] [2,4]
ob.pipe(withLatestFrom(ob2)).subscribe(console.log)

const ob3 = interval(2000);
const ob4 = interval(1000);
// [0,0] [0,1] [0,2] [1,2]
combineLatest([ob3, ob4]).subscribe(console.log);
