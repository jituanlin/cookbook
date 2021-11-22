import {Title} from '../type';

export const titles: readonly Title[] = [
  {
    id: 1,
    title: 'level1',
    parentId: null,
  },
  {
    id: 2,
    title: 'level2-1',
    parentId: 1,
  },
  {
    id: 3,
    title: 'level2-2',
    parentId: 1,
  },
  {
    id: 4,
    title: 'level3-1',
    parentId: 2,
  },
  {
    id: 5,
    title: 'level3-2',
    parentId: 2,
  },
];
