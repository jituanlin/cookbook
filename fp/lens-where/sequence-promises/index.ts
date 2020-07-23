import * as R from 'ramda';

const sequencePromises = R.curry(
  <R, E extends Error>(
    errorWrapper: (e: Error) => E,
    promises: ReadonlyArray<Promise<R>>
  ): Promise<Array<R | E>> => {
    return R.pipe(
      R.map(async promise => {
        try {
          const result = await promise;
          return result;
        } catch (error) {
          return  errorWrapper(error);
        }
      }),
      Promise.all.bind(Promise)
    )(promises) as Promise<Array<R | E>>;
  }
);

export default sequencePromises