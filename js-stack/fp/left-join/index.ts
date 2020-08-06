/**
 * The following function is a simulation of leftJoin of SQL.
 * */
export const leftJoin = <A, B, C>(
  predicate: (a: A, b: B) => boolean,
  mergeBy: (a: A, b: B | undefined) => C
) => (recordsA: A[], recordsB: B[]): C[] => {
  const matchedABPairs: [A, B | undefined][] = recordsA.flatMap(a => {
    const abs: [A, B][] = recordsB
      .filter(b => predicate(a, b))
      .map(b => [a, b]);
    return abs.length === 0 ? [[a, undefined]] : abs;
  });
  return matchedABPairs.map(([a, b]) => mergeBy(a, b));
};
