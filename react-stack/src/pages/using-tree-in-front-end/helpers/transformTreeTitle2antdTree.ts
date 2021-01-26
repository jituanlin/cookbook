import {AntdTree, Title, TreeTitle} from '../types';
import {pipeable, tree} from 'fp-ts2';

export const transformTreeTitle2antdTree = (treeTitle: TreeTitle): AntdTree => {
  return pipeable.pipe(
    treeTitle,
    tree.fold((a: Title, bs: AntdTree[]) => ({
      title: a.title,
      key: String(a.id),
      children: bs,
    }))
  );
};
