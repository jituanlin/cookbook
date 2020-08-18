import lazySingleton from './index';

describe('lazy-singleton-decorator', () => {
  test('decorated attribute should be cached when first access', async () => {
    const tracker: number[] = [];

    class Test {
      @lazySingleton()
      get resource() {
        tracker.push(0);
        return Promise.resolve(0);
      }

      async logResource() {
        console.log(await this.resource);
      }
    }

    const test = new Test();
    await test.logResource();
    await test.logResource();
    expect(tracker).toEqual([0]);
  });
});
