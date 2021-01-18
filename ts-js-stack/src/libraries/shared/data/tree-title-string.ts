import * as F from 'fp-ts';
import {Title} from '../type';
import {treeTitle} from './tree-title';

export const treeTitleString = F.tree.map((title: Title) => title.title)(
  treeTitle
);
