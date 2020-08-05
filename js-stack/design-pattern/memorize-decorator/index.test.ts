import {memorize} from './index';

const TestUtil = () => {
  const tracker: [number, number][] = [];
  class Test {
    @memorize()
    getData(a: number, b: number) {
      tracker.push([a, b]);
      return {a, b};
    }
  }
  return [tracker, Test] as const;
};

test('memorized property should cache call result', () => {
  const [tracker, Test] = TestUtil();
  const test = new Test();
  test.getData(1, 2);
  test.getData(1, 2);
  test.getData(1, 3);
  expect(tracker).toEqual([
    [1, 2],
    [1, 3],
  ]);
});
