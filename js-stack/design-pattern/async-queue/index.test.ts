import {AsyncQueue} from './index';
import {TimeOut} from '../../utils/TimeOut';

const mockRequest = async (a, timeout, isSuccess = true) => {
  await TimeOut(timeout);
  if (isSuccess) return a;
  throw a;
};

test('should AsyncQueue respect pushed order', async () => {
  const result = [];
  const queue = new AsyncQueue();
  await queue.push(mockRequest(1, 100).then(a => result.push(a)));
  await queue.push(mockRequest(2, 50).then(a => result.push(a)));
  expect(result).toEqual([1, 2]);
});

test('should AsyncQueue ignore error of previous job', async () => {
  const result = [];
  const queue = new AsyncQueue();
  try {
    await queue.push(mockRequest(1, 100, false).then(a => result.push(a)));
  } catch (e) {}
  await queue.push(mockRequest(2, 50).then(a => result.push(a)));
  expect(result).toEqual([2]);
});
