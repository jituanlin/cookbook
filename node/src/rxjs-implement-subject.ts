/**
 * Implement the `Subject`.
 * */
import {
  noopSubscription,
  Observable,
  Observer,
  Subscribable,
  Subscription,
} from "./rxjs-implement-observable";

export class Subject<T> implements Observer<T>, Subscribable<T> {
  private observers: Observer<T>[] = [];

  subscribe(ob: Observer<T>): Subscription {
    const idx = this.observers.push(ob);
    return {
      unSubscribe: () => {
        this.observers = this.observers.splice(idx, 1);
      },
    };
  }

  next(v: T) {
    this.observers.forEach((ob) => ob.next(v));
  }
}

describe("Subject", () => {
  it("should be able to observe", () => {
    const subject = new Subject<number>();
    const observer = jest.fn();
    subject.subscribe({
      next: observer,
    });
    subject.next(0);
    expect(observer).toBeCalledWith(0);
  });
  it("should performance like Observable", () => {
    const subject = new Subject<number>();
    const observer = {
      next: jest.fn(),
    };
    subject.subscribe(observer);

    const observable = new Observable<number>((observer) => {
      observer.next(0);
      return noopSubscription;
    });
    observable.subscribe(subject);
    expect(observer.next).toBeCalledWith(0);
  });
});
