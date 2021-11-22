import {PromiseA, States} from './basic-promise-implementation';

describe('promise-basic-implementation', () => {
  test('`Promise` is in one of state: pending, resolved, rejected', async () => {
    const p = new PromiseA((resolve, reject) => {
      setTimeout(() => resolve(42), 0);
    });
    expect(p.getState()).toBe(States.Pending);
    await p;
    expect(p.getState()).toBe(States.Resolved);

    const p1 = new PromiseA((resolve, reject) => {
      setTimeout(() => reject(42), 0);
    });

    try {
      await p1;
    } catch (e) {
      expect(p1.getState()).toBe(States.Rejected);
    }
  });

  test('`then` should immutably return a new `Promise`', async () => {
    const p = PromiseA.resolve(42);
    const p1 = p.then(console.log.bind(this));
    expect(p).not.toBe(p1);
  });

  test('resolve/reject callback in constructor should call synchronously', async () => {
    let n: number | undefined;
    const p = new PromiseA(resolve => {
      n = 0;
      resolve(42);
    });
    expect(n).not.toBeNull();
  });

  test('can use `catch` to handle rejected `Promise` and return new `Promise`', async () => {
    const val = await PromiseA.reject(42).catch((n: any) => n + 1);
    expect(val).toBe(43);
  });

  test('can use `catch` to catch thrown error and return new `Promise`', async () => {
    const p = new PromiseA((resolve, reject) => {
      throw 42;
    });
    const val = await p.catch((n: any) => n + 1);
    expect(val).toBe(43);
  });

  test('`Promise` should support call `then` multiply', async () => {
    const p = PromiseA.resolve(42);
    const val1 = await p;
    const val2 = await p;
    const val3 = await p;
    expect([val1, val2, val3]).toEqual([42, 42, 42]);
  });
});
