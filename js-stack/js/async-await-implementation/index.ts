export const run = <N extends Promise<any>, T>(
  generator: Generator<N, T>,
  previousPromise: N | Promise<undefined> = Promise.resolve(undefined)
): Promise<T> => {
  return (previousPromise as N).then(previousValue => {
    const {value: currentPromiseOrReturnedValue, done} = generator.next(
      previousValue
    );
    if (done) {
      return currentPromiseOrReturnedValue;
    }
    return run(generator, currentPromiseOrReturnedValue as N);
  });
};
