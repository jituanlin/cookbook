import * as F from 'fp-ts';
import * as R from 'ramda';
import {Title, TreeTitle} from './__internal/type';
import {titles} from './__internal/data/titles';

export const treeTitle: TreeTitle = F.tree.unfoldTree<Title, number>(1, id => {
  const self = titles.find(R.propEq('id', id), titles)!;
  const seeds = F.pipeable.pipe(
    titles,
    R.filter<Title, 'array'>(R.propEq('parentId', self.id) as any),
    R.pluck('id')
  );

  return [self, seeds];
});
