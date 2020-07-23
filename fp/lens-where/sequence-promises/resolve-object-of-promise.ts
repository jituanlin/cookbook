import * as R from 'ramda';

type UnpackIfPromise<T> = T extends Promise<infer A> ? A : T;

type ResolveObjectOfPromise = <T extends Record<any, Promise<any> | any>>(
    objectOfPromise: T,
) => Promise<{ [K in keyof T]: UnpackIfPromise<T[K]> }>;

/**
 * @example
 resolveObjectOfPromise({
  a:Promise.resolve(42),
  b:Promise.resolve(43),
  c:45
})
 // { a: 42, b: 43, c: 45 }
 * */
// @ts-ignore
const resolveObjectOfPromise: ResolveObjectOfPromise = R.pipe(
    R.toPairs,
    R.map(async ([key, promise]) => {
        const result = await promise;
        return [key, result];
    }),
    Promise.all.bind(Promise),
    R.then(R.fromPairs),
);

export default resolveObjectOfPromise;