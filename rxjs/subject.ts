import { from, Observable, Subject } from "rxjs";
import {multicast} from "rxjs/operators";

/**
 * Subject is observable and observe
 * */

//subject is observable
const subject1 = new Subject();
subject1.subscribe(n => console.log(n));
subject1.next(1);

//subject is observe
const subject2 = new Subject();
subject2.subscribe(n => console.log(n));
const observable1 = from([1, 2, 3]);
observable1.subscribe(subject2);

/* --- */

/**
 * `normal` observable execution context is isolated,
 * but there is two way to change a observable to share execution context
 * */

// output two different number
const observable2 = new Observable(subscriber => {
  subscriber.next(Math.random());
  subscriber.complete();
});
observable2.subscribe(n => console.log(n));
observable2.subscribe(n => console.log(n));

// first way: subscribe a observable by a subject
// output two same number
const observable3 = new Observable(subscriber => {
  subscriber.next(Math.random());
  subscriber.complete();
});
const subject3 = new Subject();
subject3.subscribe(n => console.log(n));
subject3.subscribe(n => console.log(n));
observable3.subscribe(subject3);

// second way: multicast it
const observable4 = new Observable(subscriber => {
    subscriber.next(Math.random());
    subscriber.complete();
});
const subject4 = new Subject();
const multicasted = observable4.pipe(multicast(subject4))
multicasted.subscribe(n=>console.log(n))
multicasted.subscribe(n=>console.log(n))
// @ts-ignore
multicasted.connect()

/* --- */
