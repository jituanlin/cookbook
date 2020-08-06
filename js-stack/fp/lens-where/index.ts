/**
 * This module is a implementation of `Lens Like` of predicate of Array/Record data structure.
 * `Lens Like` means something different from Ramda's original lens:
 *    what getter returns is not a single value, but a tuple of value and index(Array)/key(Record).
 *    Similarly, setter accept a tuple of value and index(Array)/key(Record) rather than a single value.
 * @example: See unit test.
 * */

import * as R from 'ramda';
import {Lens} from 'ramda';

type Target<T> = ReadonlyArray<T> | Record<string, T>;
type IndexAndValuePairs<T> = [string, T];

/**
 * Used to find the matched [index,value] in array or record
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
    R.pipe(R.nth(1), predicate)
  )(indexAndValuePairs);

  return matchedIndexAndValuePair;
};

/**
 * Get lens of array/record by predicate
 * */
export const lensWhere = <T>(predicate: (elem: T) => boolean): Lens => {
  const getter = (target: Target<T>): IndexAndValuePairs<T> | undefined => {
    const matchedIndexAndValuePair:
      | IndexAndValuePairs<T>
      | undefined = getMatchedIndexAndValuePair(target, predicate);

    return matchedIndexAndValuePair;
  };

  const setter = (
    maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined,
    target: Target<T>
  ) => {
    if (R.isNil(maybeIndexAndValuePairs)) {
      return target;
    }

    const lens = R.is(Array, target)
      ? R.lensIndex(Number(maybeIndexAndValuePairs[0]))
      : R.lensProp(maybeIndexAndValuePairs[0]);

    return R.set(lens, maybeIndexAndValuePairs[1], target);
  };

  return R.lens(getter, setter);
};

/**
 * Helper to extract index from lens return
 * */
export const extractIndex = <T>(
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
): string | undefined => maybeIndexAndValuePairs?.[0];

/**
 * Helper to extract value from lens return
 * */
export const extractValue = <T>(
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
): T | undefined => maybeIndexAndValuePairs?.[1];

/**
 * Helper to `over` value of lens return
 * */
export const overValue = <T>(fn: (value: T) => T) => (
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
): IndexAndValuePairs<T> | undefined =>
  R.when(
    R.complement(R.isNil),
    R.over(R.lensIndex(1), fn),
    maybeIndexAndValuePairs
  );
