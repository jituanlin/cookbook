import {debounce} from 'lodash';
import {TimeOut} from './time-out';

describe('debounce', () => {
  test('debounce test', async () => {
    const tracker: number[] = [];
    const debounced = debounce(
      (n: number) => {
        tracker.push(n);
      },
      100,
      {
        maxWait: 500,
      }
    );
    debounced(1);
    debounced(2);
    debounced(3);
    await TimeOut(200);
    expect(tracker).toEqual([3]);
  });
});
