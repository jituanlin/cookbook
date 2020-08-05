import CallsMerger from './index';
import {TimeOut} from '../../utils/TimeOut';

const APIUtils = () => {
  let tracker: number[] = [];
  const api = async (xs: number[]) => {
    tracker = tracker.concat(xs);
    return xs;
  };
  return [tracker, api] as const;
};

test('should CallMerger merge all calls in the interval', async () => {
  let promise = Promise.resolve();
  const [tracker, api] = APIUtils();
  const callMerger = new CallsMerger(50, 500, api);
  promise = promise.then(() =>
    callMerger.callApiSingly(1).then(result => expect(result).toBe(1))
  );
  await TimeOut(10);
  promise = promise.then(() =>
    callMerger.callApiSingly(2).then(result => expect(result).toBe(2))
  );
  await TimeOut(10);
  promise = promise.then(() =>
    callMerger.callApiSingly(3).then(result => expect(result).toBe(3))
  );
  expect(tracker).toEqual([]);
  await promise;
  expect(tracker).toEqual([1, 2, 3]);
});
