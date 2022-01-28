/*eslint-disable @typescript-eslint/ban-types*/
import {isEqual} from 'lodash';

export const memorize =
  (compare: (left: any, right: any) => boolean = isEqual) =>
  <PS extends Array<any>, Result>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(this: Object, ...params: PS) => Result>
  ) => {
    const originalMethod = descriptor.value!;
    const symbol = Symbol('memorize decorator');
    return {
      value: function (...params: PS): Result {
        if (this[symbol] === undefined) {
          this[symbol] = new Set<[PS, Result]>();
        }
        const maybeSavedPair = Array.from<[PS, Result]>(
          this[symbol].values()
        ).find(([savedParams]) => compare(savedParams, params));
        if (maybeSavedPair === undefined) {
          const result = originalMethod.call<Object, PS, Result>(
            this,
            ...params
          );
          this[symbol].add([params, result]);
          return result;
        } else {
          return maybeSavedPair[1];
        }
      },
    };
  };
