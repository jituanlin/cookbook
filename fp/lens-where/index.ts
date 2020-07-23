import * as R from 'ramda';

type Target<T> = ReadonlyArray<T> | Record<string, T>;
type IndexAndValuePairs<T> = [string, T];

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
    R.pipe(
      // @ts-ignore
      R.nth(1),
      predicate
    )
  )(indexAndValuePairs);

  return matchedIndexAndValuePair;
};

/**
 * @see ./lensWhere.md
 * */
const lensWhere = <T>(predicate: (elem: T) => boolean) => {
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

export const extractIndex = <T>(
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
): string | undefined =>
  // @ts-ignore
  R.when(R.complement(R.isNil), R.nth(0), maybeIndexAndValuePairs);

export const extractValue = <T>(
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
): T | undefined =>
  // @ts-ignore
  R.when(R.complement(R.isNil), R.nth(1), maybeIndexAndValuePairs);

export const overValue = <T>(fn: (value: T) => T) => (
  maybeIndexAndValuePairs: IndexAndValuePairs<T> | undefined
) =>
  R.when(
    R.complement(R.isNil),
    R.over(R.lensIndex(1), fn),
    maybeIndexAndValuePairs
  );

export default lensWhere;
