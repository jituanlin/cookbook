/**
 * This module is a implementation of predicate Lens for Array/Record data structure.
 * @example: See unit test.
 * */

import * as R from "ramda";
import { Lens } from "ramda";

type Target<T> = T[] | Record<string, T>;
type IndexAndValue<T> = [string, T];

/**
 * Get lens of array/record by predicate.
 * */
function lensWhere<T>(predicate: (elem: T) => boolean): Lens {
  const getter = (target: Target<T>): T | undefined => {
    const matchedIndexAndValue: IndexAndValue<T> | undefined =
      getMatchedIndexAndValue(target, predicate);
    return matchedIndexAndValue?.[1];
  };
  const setter = (value: T, target: Target<T>) => {
    const matchedIndexAndValue: IndexAndValue<T> | undefined =
      getMatchedIndexAndValue(target, predicate);
    if (matchedIndexAndValue === undefined) {
      return target;
    }
    const lens = Array.isArray(target)
      ? R.lensIndex(Number(matchedIndexAndValue[0]))
      : R.lensProp(matchedIndexAndValue[0]);
    return R.set(lens, value, target);
  };
  return R.lens(getter, setter);
}

/**
 * Find the matched [index,value] in array or record.
 * */
function getMatchedIndexAndValue<T>(
  target: Target<T>,
  predicate: (elem: T) => boolean
): IndexAndValue<T> | undefined {
  const indexAndValuePairs = Array.isArray(target)
    ? array2IndexAndValuePairs(target)
    : Object.entries(target);
  return indexAndValuePairs.find(([_index, value]) => predicate(value));
}

function array2IndexAndValuePairs<T>(
  array: ReadonlyArray<T>
): ReadonlyArray<IndexAndValue<T>> {
  return Array.from(array.entries()).map(([index, value]) => [
    String(index),
    value,
  ]);
}

describe("lens-where", () => {
  const students = [
    { id: 1, score: 40 },
    { id: 2, score: 50 },
    { id: 3, score: 60 },
  ];
  const id2student = {
    1: { id: 1, score: 40 },
    2: { id: 2, score: 50 },
    3: { id: 3, score: 60 },
  };
  const studentWhereLens = lensWhere(R.propEq("id", 1));
  it("should return student when `view` on array", () => {
    expect(R.view(studentWhereLens, students)).toEqual({
      id: 1,
      score: 40,
    });
  });
  it("should return student when `view` on record", () => {
    expect(R.view(studentWhereLens, id2student)).toEqual({
      id: 1,
      score: 40,
    });
  });
  it("should update the array when an element of array matches the predicate", () => {
    expect(R.set(studentWhereLens, { id: 1, score: 150 }, students)).toEqual([
      { id: 1, score: 150 },
      { id: 2, score: 50 },
      { id: 3, score: 60 },
    ]);
  });
  it("should update the record when an value of record matches the predicate", () => {
    expect(R.set(studentWhereLens, { id: 1, score: 150 }, id2student)).toEqual({
      1: { id: 1, score: 150 },
      2: { id: 2, score: 50 },
      3: { id: 3, score: 60 },
    });
  });
});
