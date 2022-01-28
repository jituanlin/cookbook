import {run} from './js-async-await-implementation';

describe('async-await-implementation', () => {
  test('basic functionality', async () => {
    function* generatorFn(): Generator<Promise<number>, number, number> {
      const a = yield Promise.resolve(1);
      const b = yield Promise.resolve(2);
      return (a + b) as number;
    }

    return run(generatorFn()).then(value => expect(value).toEqual(3));
  });
});
