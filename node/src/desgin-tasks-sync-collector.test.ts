import TaskSyncCollector from './desgin-tasks-sync-collector';
import {getApiAndTracker} from './__internal/get-api-and-tracker';

describe('sync-collector-of-tasks', () => {
  test('SyncCollectorOfTasks should collect all calls in current synchronous execution context', async () => {
    const [tracker, api] = getApiAndTracker();
    const taskCollector = new TaskSyncCollector(api);
    const promiseA = taskCollector.getResultFor(1);
    const promiseB = taskCollector.getResultFor(2);
    expect(tracker).toEqual([]);
    const [a, b] = await Promise.all([promiseA, promiseB]);
    expect(a).toBe(1);
    expect(b).toBe(2);
    expect(tracker).toEqual([1, 2]);
  });
});
