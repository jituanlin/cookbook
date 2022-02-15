import {tree} from 'fp-ts';
import assert from 'assert';
import {traversal} from 'monocle-ts';
import {pipe} from 'fp-ts/function';

interface Title {
    id: number;
    parentId: number | null;
    title: string;
}

const titleTree: tree.Tree<Title> = {
    value: {id: 1, title: 'level1', parentId: null},
    forest: [
        {
            value: {id: 2, title: 'level2-1', parentId: 1},
            forest: [
                {value: {id: 4, title: 'level3-1', parentId: 2}, forest: []},
                {
                    value: {
                        id: 5,
                        title: 'level3-2',
                        parentId: 2,
                    },
                    forest: [],
                },
            ],
        },
        {value: {id: 3, title: 'level2-2', parentId: 1}, forest: []},
    ],
};

const getLeafTraversal = (id: number): traversal.Traversal<tree.Tree<Title>, Title> =>
    pipe(
        traversal.fromTraversable(tree.Traversable)<Title>(),
        traversal.filter(title => title.id === id)
    );

assert.deepStrictEqual(
    traversal.getAll(titleTree)(getLeafTraversal(3)),
    [{
        id: 3,
        title: 'level2-2',
        parentId: 1,
    }]
);
