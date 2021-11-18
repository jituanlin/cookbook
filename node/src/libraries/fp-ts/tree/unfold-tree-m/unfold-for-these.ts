import {these, tree} from 'fp-ts';
import {unfoldTreeM} from 'fp-ts/Tree';
import {both, left, right, These} from 'fp-ts/These';
import {getSemigroup, NonEmptyArray} from 'fp-ts/NonEmptyArray';

interface Title {
  id: number;
  title: string;
}

const getTitleDto = (
  id: number
): These<NonEmptyArray<string>, [Title, number[]]> => {
  const title = {id, title: `content of title[id=${id}]`};

  if (id === 2) {
    return both(['cannot get child title of [id]=2'], [title, []]);
  }
  return right([title, id < 3 ? [id + 1, id + 2] : []]);
};

export const treeTheseTitle: These<string[], tree.Tree<Title>> = unfoldTreeM(
  these.getMonad(getSemigroup<string>())
)(1, getTitleDto);
