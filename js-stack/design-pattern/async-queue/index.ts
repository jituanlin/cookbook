/**
 * AsyncQueue is used to obtain asynchronous job results according to the order of push.
 * If one job throws an error, it will be ignored and will not affect other jobs.
 * */
export class AsyncQueue {
  private promise: Promise<any> = Promise.resolve();

  async push<T>(promise: Promise<T>): Promise<T> {
    this.promise = this.promise.then(
      () => promise,
      () => promise
    );
    return this.promise;
  }
}
