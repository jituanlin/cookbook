import {sequenceRecordOfPromises} from './index';

test('sequence record of promise basic functionality', async () => {
  const result = await sequenceRecordOfPromises({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
  });
  expect(result).toEqual({
    a: 1,
    b: 2,
  });
});
