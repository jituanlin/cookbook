import * as R from 'ramda';

type UnpackIfPromise<T> = T extends Promise<infer A> ? A : T;

type SequenceRecordOfPromises = <T extends Record<any, Promise<any> | any>>(
  objectOfPromise: T
) => Promise<{[K in keyof T]: UnpackIfPromise<T[K]>}>;

export const sequenceRecordOfPromises: SequenceRecordOfPromises = R.pipe(
  R.toPairs,
  R.map(async ([key, promise]) => {
    const result = await promise;
    return [key, result];
  }),
  Promise.all.bind(Promise),
  R.then(R.fromPairs)
) as SequenceRecordOfPromises;
