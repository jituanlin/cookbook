/**
 * `unfoldTreeM` [corecusrsively](https://www.wikiwand.com/en/Corecursion) builds a tree from a seed value
 * in `Monad` context.
 * How produced values are composed depends on the `Monad` instance.
 * */
import {none, Option, some} from 'fp-ts/Option';
import {option} from 'fp-ts';
import {unfoldTreeM} from 'fp-ts/Tree';
import assert from "assert";

type TitleID = number;

interface Title {
    id: TitleID;
    content: string;
}

const getTitleAndItsChildrenIDs = (id: number): Option<[Title, TitleID[]]> => {
    if (id === 2) {
        return none;
    }
    const title: Title = {id, content: `content of title[id=${id}]`};
    const childrenIDs = id < 3 ? [id + 1, id + 2] : [];
    return some([title, childrenIDs]);
};

/**
 * Any `none` returned in corecursion results in `none` being returned as final result,
 * because `chain` of `option` has short-circuit nature.
 * */
assert.deepStrictEqual(
    unfoldTreeM(option.Monad)(1, getTitleAndItsChildrenIDs),
    none
);
