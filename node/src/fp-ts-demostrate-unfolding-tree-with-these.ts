/**
 * See ./fp-ts-demostrate-unfolding-tree-with-option-monad.ts.
 * */
import {these, tree} from 'fp-ts';
import {unfoldTreeM} from 'fp-ts/Tree';
import {both, right, These} from 'fp-ts/These';
import {getSemigroup, NonEmptyArray} from 'fp-ts/NonEmptyArray';
import * as assert from "assert";

type TitleID = number;

interface Title {
    id: TitleID;
    content: string;
}

const getTitleAndItsChildrenIDs = (
    id: number
): These<NonEmptyArray<string>, [Title, TitleID[]]> => {
    const title: Title = {id, content: `content of title[id=${id}]`};
    if (id === 2) {
        return both(['cannot get child title of [id]=2'], [title, []]);
    }
    const childrenIDs = id < 3 ? [id + 1, id + 2] : [];
    return right([title, childrenIDs]);
};

const titleTree: These<string[], tree.Tree<Title>> = unfoldTreeM(
    these.getMonad(getSemigroup<string>())
)(1, getTitleAndItsChildrenIDs);

assert.deepStrictEqual(
    titleTree,
    {
        _tag: 'Both',
        left: ['cannot get child title of [id]=2'],
        right: {
            forest: [
                {
                    forest: [],
                    value: {
                        id: 2,
                        title: 'content of title[id=2]',
                    },
                },
                {
                    forest: [],
                    value: {
                        id: 3,
                        title: 'content of title[id=3]',
                    },
                },
            ],
            value: {
                id: 1,
                title: 'content of title[id=1]',
            },
        },
    }
);
