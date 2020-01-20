/**
 * Metaphor: Pair love birds, love birds need to always be together.
 *
 * Core: Combine by zip(compare to *combineLatest*),
 * result observable emit value from each
 * input observable aligned.
 *
 * */

import { interval, zip } from "rxjs";

const ob = interval(1000);
const ob2 = interval(2000);
// [0,0] [1,1] [2,2]
zip(ob, ob2).subscribe(console.log);
