import {none, Option, some} from 'fp-ts/Option';
import {option, tree} from 'fp-ts';
import {unfoldTreeM} from 'fp-ts/Tree';

interface Title {
  id: number;
  title: string;
}

const getTitleDto = (id: number): Option<[Title, number[]]> => {
  if (id === 2) {
    return none;
  }
  const title = {id, title: `content of title[id=${id}]`};
  return some([title, id < 3 ? [id + 1, id + 2] : []]);
};

export const treeTaskOptionTitle: Option<tree.Tree<Title>> = unfoldTreeM(
  option.option
)(1, getTitleDto);
