import * as F from 'fp-ts';

export interface Title {
  id: number;
  parentId: number | null;
  title: string;
}

export type TreeTitle = F.tree.Tree<Title>;
