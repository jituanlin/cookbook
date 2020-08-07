/**
 * Wait for all the promises to return.
 * Unlike `Promise.all`, if an error occurs,
 * it mixes the error into the returned array instead of returning only the first error.
 * */
export const getResultOrErrorOfPromises = <E extends Error, R>(
  promises: ReadonlyArray<Promise<R>>
): Promise<Array<R | E>> => {
  return Promise.all(
    promises.map(async promise => {
      try {
        return await promise;
      } catch (error) {
        return error as E;
      }
    })
  );
};
