import {pipe} from 'fp-ts/function';
import {array, tree} from 'fp-ts';
import assert from 'assert';

interface Title {
    id: number;
    parentId: number | null;
    title: string;
}

const titles: readonly Title[] = [
    {
        id: 1,
        title: 'level1',
        parentId: null,
    },
    {
        id: 2,
        title: 'level2-1',
        parentId: 1,
    },
    {
        id: 3,
        title: 'level2-2',
        parentId: 1,
    },
    {
        id: 4,
        title: 'level3-1',
        parentId: 2,
    },
    {
        id: 5,
        title: 'level3-2',
        parentId: 2,
    },
];

type TitleID = number;

const getTitleAndItsChildrenIds = (id: TitleID): [Title, TitleID[]] => {
    const self = titles.find(title => title.id === id, titles)!;
    const seeds = pipe(
        titles,
        array.filter(title => title.parentId === id),
        array.map(title => title.id)
    );

    return [self, seeds];
};

const titleTree: tree.Tree<Title> = tree.unfoldTree<Title, number>(
    1,
    getTitleAndItsChildrenIds
);

assert.deepStrictEqual(titleTree, {
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
});
