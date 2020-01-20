import { merge, of, Subject } from "rxjs";
import { distinct, filter, map, mapTo, mergeScan, tap } from "rxjs/operators";

enum EEventType {
  Visible,
  UnVisible
}

interface IEvent {
  type: EEventType;
  n: number;
}

const visible$ = new Subject<number>();
const unVisible$ = new Subject<number>();

const AssociateWithType = (type: EEventType) => (n: number) => ({
  n,
  type
});

const scanToValidLeaveEvent = mergeScan(
  ({ previous }, current: IEvent) =>
    of({
      previous: current,
      n:
        previous &&
        previous.type === EEventType.Visible &&
        current.type === EEventType.UnVisible
          ? current.n - previous.n
          : null
    }),
  { previous: null, n: null }
);

const m$ = merge(
  visible$.pipe(map(AssociateWithType(EEventType.Visible))),
  unVisible$.pipe(map(AssociateWithType(EEventType.UnVisible)))
).pipe(
  tap(console.log),
  scanToValidLeaveEvent,
  map(({ n }) => n),
  filter(n => n !== null)
);

setTimeout(() => unVisible$.next(1), 250);

setTimeout(() => {
  m$.subscribe(console.log);
}, 300);

setTimeout(() => visible$.next(2), 550);

setTimeout(() => unVisible$.next(3), 600);

setTimeout(() => unVisible$.next(4), 750);
