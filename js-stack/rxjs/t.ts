import {merge, ReplaySubject, Subject} from 'rxjs';
import {distinct, tap} from 'rxjs/operators';

const ob = new Subject();

const ob2 = new Subject();

// ob.next({i:1,v:1})

// ob2.next({i:2,v:2})

// ob2.next({i:3,v:3})

const sub = ob2.pipe(
  distinct((n: any) => n.i),
  tap(console.log)
);

sub.subscribe(console.log);

sub.subscribe(console.log);
ob2.next({i: 1, v: 4});
