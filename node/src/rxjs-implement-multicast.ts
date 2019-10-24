import { noopSubscription, Observable } from "./rxjs-implement-observable";
import { Subject } from "./rxjs-implement-subject";

const multicast = <T>(observable: Observable<T>, subject: Subject<T>) => ({
  connect: () => observable.subscribe(subject),
  subscribe: subject.subscribe.bind(subject),
});

it("should push events to all subscribers", () => {
  const observable = new Observable((observe) => {
    observe.next(0);
    return noopSubscription;
  });
  const subject = new Subject();
  const multicasted = multicast(observable, subject);
  const observe = jest.fn();
  multicasted.subscribe({ next: observe });
  multicasted.subscribe({ next: observe });
  multicasted.connect();
  expect(observe).nthCalledWith(1, 0);
  expect(observe).nthCalledWith(2, 0);
});
