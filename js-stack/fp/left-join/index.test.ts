import {leftJoin} from './index';

test('basic functionality test', () => {
  interface IdWithName {
    id: number;
    name: string;
  }

  interface IdWithNickName {
    id: number;
    nickName: string;
  }

  const recordsA: IdWithName[] = [
    {
      id: 1,
      name: 'name1',
    },
    {
      id: 2,
      name: 'name2',
    },
  ];
  const recordsB: IdWithNickName[] = [
    {
      id: 1,
      nickName: 'nickName11',
    },
    {
      id: 1,
      nickName: 'nickName12',
    },
  ];
  const predicate = (a: IdWithName, b: IdWithNickName) => a.id === b.id;
  const mergeBy = (a: IdWithName, b: IdWithNickName | undefined) =>
    b ? {...a, ...b} : a;

  const results = leftJoin(predicate, mergeBy)(recordsA, recordsB);

  expect(results).toEqual([
    {
      id: 1,
      name: 'name1',
      nickName: 'nickName11',
    },
    {
      id: 1,
      name: 'name1',
      nickName: 'nickName12',
    },
    {
      id: 2,
      name: 'name2',
    },
  ]);
});
