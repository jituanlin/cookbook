/**
 * The following function is a simulation of innerJoin of SQL.
 * */
export const innerJoin =
  <A, B, C>(predicate: (a: A, b: B) => boolean, mergeBy: (a: A, b: B) => C) =>
  (recordsA: A[], recordsB: B[]): C[] => {
    const matchedABPairs = recordsA.flatMap(a =>
      recordsB.filter(b => predicate(a, b)).map(b => [a, b] as const)
    );
    return matchedABPairs.map(([a, b]) => mergeBy(a, b));
  };
