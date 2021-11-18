import {Title} from './types';
import {TimeOut} from '../../utils/TimeOut';

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

export const fetchTitles = async (): Promise<readonly Title[]> => {
  await TimeOut(1000);
  return titles;
};

export const fetchContent = async (titleId: number): Promise<string> => {
  await TimeOut(1000);
  return `content of title[id=${titleId}] first paragraph
content of title[id=${titleId}] second paragraph
content of title[id=${titleId}] second paragraph`;
};
