import * as R from 'ramda';
import {Title, TreeTitle} from './__internal/type';
import {titles} from './__internal/data/titles';
import {pipe} from 'fp-ts/function';
import {tree} from 'fp-ts';

export const treeTitle: TreeTitle = tree.unfoldTree<Title, number>(1, id => {
  const self = titles.find(R.propEq('id', id), titles)!;
  const seeds = pipe(
    titles,
    R.filter<Title, 'array'>(R.propEq('parentId', self.id) as any),
    R.pluck('id')
  );

  return [self, seeds];
});
