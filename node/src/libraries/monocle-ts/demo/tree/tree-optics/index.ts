import * as F from 'fp-ts';
import * as M from 'monocle-ts';
import * as R from 'ramda';
import {Title, TreeTitle} from '../../../../shared/type';

export const LeafM = (id: number): M.Traversal<TreeTitle, Title> =>
  M.fromTraversable(F.tree.Traversable)<Title>().filter(R.propEq('id', id));

export const TitleM = (id: number): M.Traversal<TreeTitle, string> =>
  LeafM(id).composeLens(M.Lens.fromProp<Title>()('title'));
