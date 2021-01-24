import * as F from 'fp-ts2';
import {Title} from './types';

export const titleHelper = {
  find: (id: number | null) => (
    titles: readonly Title[]
  ): F.option.Option<Title> =>
    F.readonlyArray.findFirst((title: Title) => title.id === id)(titles),

  idOf: (title: Title): number => title.id,

  idsOf: (titles: readonly Title[]): readonly number[] =>
    F.readonlyArray.map((title: Title) => title.id)(titles),

  filterByParentId: (parentId: number | null) => (
    titles: readonly Title[]
  ): readonly Title[] =>
    F.readonlyArray.filter((title: Title) => title.parentId === parentId)(
      titles
    ),

  coRecTree: (titles: readonly Title[]) => (
    id: number
  ): F.option.Option<[Title, number[]]> => {
    const self = titleHelper.find(id)(titles);

    const seeds = F.pipeable.pipe(
      self,
      F.option.map(s => titleHelper.filterByParentId(s.id)(titles)),
      F.option.map(ts => F.readonlyArray.map((t: Title) => t.id)(ts))
    );

    return F.apply.sequenceT(F.option.option)(
      self,
      seeds as F.option.Option<number[]>
    );
  },
};

export const unfoldTreeTitle = (
  titles: readonly Title[]
): F.option.Option<F.tree.Tree<Title>> => {
  const rootId = F.function.pipe(
    titles,
    titleHelper.find(null),
    F.option.map(titleHelper.idOf)
  );

  return F.pipeable.pipe(
    rootId,
    F.option.chain(rid =>
      F.tree.unfoldTreeM(F.option.option)(rid, titleHelper.coRecTree(titles))
    )
  );
};
