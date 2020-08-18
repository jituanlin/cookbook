import {autoRun, Observable} from './index';

describe('auto-run', () => {
  test('modifying the observable should trigger the fn passed to autorun', () => {
    const obj = Observable({a: 1});
    let a;
    autoRun(() => {
      a = obj.a;
    });
    expect(a).toBe(1);
    obj.a = 2;
    expect(a).toBe(2);
  });
});
