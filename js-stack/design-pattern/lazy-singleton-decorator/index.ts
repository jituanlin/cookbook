import * as R from 'ramda';

/**
 * @example
 *
 *
 class Test {
  @lazySingleton()
  get studentTest() {
    console.log('called dao');
    return Promise.resolve([1, 2, 3]);
  }
  async test() {
    console.log(await this.studentTest);
  }
}
 const test = new Test();
 // 'call dao' will just be called one time
 test.test();
 test.test();
 setTimeout(() => {
  const test1 = new Test();
  // 'call dao' will just be called one time
  test1.test();
  test1.test();
}, 1000);
 * */
const lazySingleton = () => <Result>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Result>
) => {
  const originalGetter = descriptor.get;
  return {
    get: function (): Result {
      if (R.isNil(this.$$cache)) {
        this.$$cache = originalGetter.call(this);
      }
      return this.$$cache;
    },
  };
};

export default lazySingleton;
