export enum States {
  Pending = 'Pending',
  Resolved = 'Resolved',
  Rejected = 'Rejected',
}

interface Handlers<A> {
  onResolved<B>(val: A): void;

  onReject<B>(reason: unknown): void;
}

export class PromiseA<A> {
  static resolve<B>(val: B): PromiseA<B> {
    return new PromiseA<B>(resolve => resolve(val));
  }
  static reject<B>(reason: unknown): PromiseA<never> {
    return new PromiseA<never>((resolve, reject) => reject(reason));
  }

  private value: A | undefined = undefined;
  private reason: unknown = undefined;
  private state: States = States.Pending;
  private handlers: Handlers<A>[] = [];

  private setAsResolved(value: A) {
    this.value = value;
    this.state = States.Resolved;
    process.nextTick(() =>
      this.handlers.forEach(({onResolved}) => onResolved(value))
    );
  }

  private setAsRejected(reason: unknown) {
    this.reason = reason;
    this.state = States.Rejected;
    process.nextTick(() =>
      this.handlers.forEach(({onReject}) => onReject(reason))
    );
  }

  constructor(
    protected readonly executor: (
      resolve: (val: A) => void,
      reject: (reason: unknown) => void
    ) => void
  ) {
    if (this.state === States.Pending) {
      try {
        executor(this.setAsResolved.bind(this), this.setAsRejected.bind(this));
      } catch (error) {
        this.setAsRejected(error);
      }
    }
  }

  then<B, C>(
    onResolved?: (value: A) => B,
    onRejected?: (reason: unknown) => C
  ): PromiseA<A | B | C> {
    if (this.state === States.Pending) {
      return new PromiseA<A | B | C>((resolve, reject) => {
        this.handlers.push({
          onResolved: () =>
            resolve(onResolved?.(this.value as A) || (this.value as A)),
          onReject: () => reject?.(onRejected?.(this.reason)),
        });
      });
    }
    if (this.state === States.Resolved) {
      return new PromiseA<A | B>(resolve => {
        try {
          resolve(onResolved?.(this.value as A) || (this.value as A));
        } catch (e) {
          onResolved?.(e);
        }
      });
    }
    return new PromiseA<C>(resolve => {
      if (onRejected) {
        resolve(onRejected(this.reason));
        return;
      }
      throw this.reason;
    });
  }

  catch<C>(onRejected?: (reason: unknown) => C): PromiseA<C> {
    return this.then(() => {}, onRejected) as PromiseA<C>;
  }

  getState(): States {
    return this.state;
  }

  private setAsPending() {
    this.state = States.Pending;
  }
}
