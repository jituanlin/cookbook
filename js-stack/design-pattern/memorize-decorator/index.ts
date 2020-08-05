import {isEqual} from 'lodash';

export const memorize = (
  compare: (left: any, right: any) => boolean = isEqual
) => <PS extends ReadonlyArray<any>, Result>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...params: PS) => Result>
) => {
  const originalMethod = descriptor.value;
  const symbol = Symbol('memorize decorator');
  return {
    value: function (...params: PS): Result {
      if (this[symbol] === undefined) {
        this[symbol] = new Set<[PS, Result]>();
      }
      const maybeSavedPair = Array.from(
        this[symbol].values()
      ).find(([savedParams]) => compare(savedParams, params));
      if (maybeSavedPair === undefined) {
        const result = originalMethod.call(this, ...params);
        this[symbol].add([params, result]);
        return result;
      } else {
        return maybeSavedPair[1];
      }
    },
  };
};
