import * as F from 'fp-ts';
import * as M from 'monocle-ts';
import * as R from 'ramda';

interface Title {
  id: number;
  parentId: number | null;
  content: string;
}

type TreeTitle = F.tree.Tree<Title>;

const LeafM = (id: number) =>
  M.fromTraversable(F.tree.Traversable)<Title>().filter(R.propEq('id', id));

const titles: readonly Title[] = [
  {
    id: 1,
    content: 'level1',
    parentId: null,
  },
  {
    id: 2,
    content: 'level2-1',
    parentId: 1,
  },
  {
    id: 3,
    content: 'level2-2',
    parentId: 1,
  },
  {
    id: 4,
    content: 'level3-1',
    parentId: 2,
  },
  {
    id: 5,
    content: 'level3-2',
    parentId: 2,
  },
];

const treeTitle: TreeTitle = F.tree.unfoldTree<Title, number>(1, id => {
  const self = titles.find(R.propEq('id', id), titles)!;
  const seeds = F.pipeable.pipe(
    titles,
    R.filter<Title, 'array'>(R.propEq('parentId', self.id) as any),
    R.pluck('id')
  );

  return [self, seeds];
});

const treeTitleContent = F.tree.map((title: Title) => title.content)(treeTitle);

console.log(F.tree.drawTree(treeTitleContent));

console.log(LeafM(3).asFold().headOption(treeTitle));

const newTreeTitle = LeafM(3)
  .composeLens(M.Lens.fromProp<Title>()('content'))
  .set('LEVEL_X')(treeTitle);

const newTitleTreeContent = F.tree.map((title: Title) => title.content)(
  newTreeTitle
);

console.log(F.tree.drawTree(newTitleTreeContent));
