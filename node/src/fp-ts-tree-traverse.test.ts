import {taskTreeArticle} from './fp-ts-tree-traverse';

describe('tree/traverse', () => {
  test('sequence Tree<Task<*>> => Task<Tree<*>>', async () => {
    const treeArticle = await taskTreeArticle();
    expect(treeArticle).toEqual({
      value: {
        id: 1,
        title: 'level1',
        parentId: null,
        content: 'content of title[1]',
      },
      forest: [
        {
          value: {
            id: 2,
            title: 'level2-1',
            parentId: 1,
            content: 'content of title[2]',
          },
          forest: [
            {
              value: {
                id: 4,
                title: 'level3-1',
                parentId: 2,
                content: 'content of title[4]',
              },
              forest: [],
            },
            {
              value: {
                id: 5,
                title: 'level3-2',
                parentId: 2,
                content: 'content of title[5]',
              },
              forest: [],
            },
          ],
        },
        {
          value: {
            id: 3,
            title: 'level2-2',
            parentId: 1,
            content: 'content of title[3]',
          },
          forest: [],
        },
      ],
    });
  });
});
