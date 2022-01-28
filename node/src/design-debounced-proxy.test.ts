import DebouncedProxy from './design-debounced-proxy';
import {TimeOut} from './__internal/time-out';
import {getApiAndTracker} from './__internal/get-api-and-tracker';

describe('call merger', () => {
  test('should CallMerger merge all calls in the interval', async () => {
    const [tracker, api] = getApiAndTracker();
    const callMerger = new DebouncedProxy(50, 500, api);
    callMerger.invoke(1).then(result => expect(result).toBe(1));
    await TimeOut(10);
    callMerger.invoke(2).then(result => expect(result).toBe(2));
    await TimeOut(10);
    callMerger.invoke(3).then(result => expect(result).toBe(3));
    expect(tracker).toEqual([]);
    await TimeOut(100);
    expect(tracker).toEqual([1, 2, 3]);
  });
});
