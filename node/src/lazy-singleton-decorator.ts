/**
 * This decorator is used to :
 *  1. make the getter lazy
 *  2. make the getter become singleton
 * Useful for certain attributes that it's expensive to init
 * */
const lazySingleton = () => <Result>(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Result>
) => {
  const originalGetter = descriptor.get;
  const symbol = Symbol('lazySingleton');
  return {
    get: function (): Result {
      if (this[symbol] === undefined) {
        this[symbol] = originalGetter?.call(this);
      }
      return this[symbol];
    },
  };
};

export default lazySingleton;
