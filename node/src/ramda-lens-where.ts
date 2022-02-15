/**
 * This module is a implementation of predicate Lens for Array/Record data structure.
 * @example: See unit test.
 * */

import * as R from 'ramda';
import {Lens} from 'ramda';

type Target<T> = ReadonlyArray<T> | Record<string, T>;
type IndexAndValuePairs<T> = [string, T];

/**
 * Used to find the matched [index,value] in array or record.
 * */
export const getMatchedIndexAndValuePair = <T>(
    target: Target<T>,
    predicate: (elem: T) => boolean
): IndexAndValuePairs<T> | undefined => {
    const indexAndValuePairs: ReadonlyArray<IndexAndValuePairs<T>> = R.ifElse(
        R.is(Array),
        R.addIndex(R.map)((value, index) => [index, value]),
        R.pipe(
            R.mapObjIndexed((value, index) => [index, value]),
            R.values
        )
    )(target);

    const matchedIndexAndValuePair = R.find<IndexAndValuePairs<T>>(
        R.pipe(R.nth(1) as any, predicate)
    )(indexAndValuePairs);

    return matchedIndexAndValuePair;
};

/**
 * Get lens of array/record by predicate.
 * */
export const lensWhere = <T>(predicate: (elem: T) => boolean): Lens => {
    const getter = (target: Target<T>): T | undefined => {
        const matchedIndexAndValuePair: IndexAndValuePairs<T> | undefined =
            getMatchedIndexAndValuePair(target, predicate);

        return matchedIndexAndValuePair?.[1];
    };

    const setter = (value: T, target: Target<T>) => {
        const matchedIndexAndValuePair: IndexAndValuePairs<T> | undefined =
            getMatchedIndexAndValuePair(target, predicate);

        if (R.isNil(matchedIndexAndValuePair)) {
            return target;
        }

        const lens = R.is(Array, target)
            ? R.lensIndex(Number(matchedIndexAndValuePair[0]))
            : R.lensProp(matchedIndexAndValuePair[0]);

        return R.set(lens, value, target);
    };

    return R.lens(getter as any, setter);
};
