import SyncCollectorOfTasks from './index';
import {getApiAndTracker} from '../../utils/GetApiAndTracker';

describe('sync-collector-of-tasks', () => {
  test('SyncCollectorOfTasks should collect all calls in current synchronous execution context', async () => {
    const [tracker, api] = getApiAndTracker();
    const taskCollector = new SyncCollectorOfTasks(api);
    const promiseA = taskCollector.getResultFor(1);
    const promiseB = taskCollector.getResultFor(2);
    expect(tracker).toEqual([]);
    const [a, b] = await Promise.all([promiseA, promiseB]);
    expect(a).toBe(1);
    expect(b).toBe(2);
    expect(tracker).toEqual([1, 2]);
  });
});
