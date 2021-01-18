import * as F from 'fp-ts';
import {LeafM, TitleM} from './index';
import {treeTitle} from '../../../../fp-ts/tree/unfold';

describe('tree-optics', () => {
  test('find leaf', () => {
    expect(LeafM(3).asFold().headOption(treeTitle)).toEqual(
      F.option.some({
        id: 3,
        title: 'level2-2',
        parentId: 1,
      })
    );
  });

  test('set leaf', () => {
    expect(TitleM(1).set('LEVEL_X')(treeTitle)).toEqual({
      value: {id: 1, title: 'LEVEL_X', parentId: null},
      forest: [
        {
          value: {id: 2, title: 'level2-1', parentId: 1},
          forest: [
            {value: {id: 4, title: 'level3-1', parentId: 2}, forest: []},
            {value: {id: 5, title: 'level3-2', parentId: 2}, forest: []},
          ],
        },
        {value: {id: 3, title: 'level2-2', parentId: 1}, forest: []},
      ],
    });
  });
});
