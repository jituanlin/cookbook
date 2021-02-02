import {treeTaskEitherTitle} from './unfold-for-task-either';
import * as F from 'fp-ts';

describe('un-fold-tree-m', () => {
  test('unfoldTreeM', async () => {
    const tree = await treeTaskEitherTitle();
    expect(tree).toEqual(
      F.either.right({
        value: {id: 1, title: 'content of title[id=1]'},
        forest: [
          {value: {id: 2, title: 'content of title[id=2]'}, forest: []},
          {value: {id: 3, title: 'content of title[id=3]'}, forest: []},
        ],
      })
    );
  });
});
