import {Title, TreeTitle} from '../types';
import * as th from './titleHelpers';
import {option, pipeable, tree} from 'fp-ts2';
import {Option} from 'fp-ts2/Option';

// It's not necessary to use unfoldM in here
export const transformTitles2tree = (
  titles: readonly Title[]
): Option<TreeTitle> => {
  const rootId = pipeable.pipe(
    titles,
    th.findByParentId(null),
    option.map(th.idOf)
  );

  return pipeable.pipe(
    rootId,
    option.chain(rid =>
      tree.unfoldTreeM(option.option)(rid, th.coRecTree(titles))
    )
  );
};
