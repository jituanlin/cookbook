/**
 * Implement the `Observable`.
 * */
import assert from "assert";

export interface Observer<T> {
  complete?: () => void;
  next: (v: T) => void;
  error?: (e: Error) => void;
}

export interface Subscription {
  unSubscribe: () => void;
}

export interface Subscribable<T> {
  subscribe: (ob: Observer<T>) => Subscription;
}

// A `Subscription` whose `unSubscribe` dose nothing.
export const noopSubscription: Subscription = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unSubscribe: () => {},
};

export class Observable<T> implements Subscribable<T> {
  constructor(
    private readonly producer: (observe: Observer<T>) => Subscription
  ) {}

  subscribe(ob: Observer<T>): Subscription {
    return this.producer(ob);
  }
}

const observable = new Observable((observe) => {
  observe.next(0);
  return noopSubscription;
});

observable.subscribe({
  next: (n) => assert.strictEqual(n, 0),
});
