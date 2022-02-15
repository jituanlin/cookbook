/**
 * Sequence Tree<Task<*>> => Task<Tree<*>>.
 * Useful when fetching additional content of tree.
 * */
import {Task} from 'fp-ts/Task';
import {task, tree} from 'fp-ts';
import {Tree} from 'fp-ts/Tree';
import {pipe} from 'fp-ts/function';
import assert from "assert";

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

interface Article extends Title {
    content: string;
}

const fetchContent = (titleId: number): Promise<string> =>
    Promise.resolve(`content of title[${titleId}]`);

const treeTaskArticle: Tree<Task<Article>> = pipe(
    titleTree,
    tree.map(title => async () => {
        const content = await fetchContent(title.id);
        return {
            ...title,
            content,
        };
    })
);

export const taskTreeArticle: Task<Tree<Article>> = tree.sequence(
    task.ApplicativePar
)(treeTaskArticle);

assert.deepStrictEqual(
    await taskTreeArticle(),
    {
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
    })
