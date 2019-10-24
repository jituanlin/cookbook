type Head<T extends any[]> = T extends [infer H, ...any] ? H : never;

type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type Curried<I extends any[], R> = I extends [infer A]
  ? (a: A) => R
  : (a: Head<I>) => Curried<Tail<I>, R>;

const curry = <I extends any[], R>(
  fn: (...args: I) => R,
  appliedArgs: any[] = [],
  argLength: number = fn.length
): Curried<I, R> => {
  if (argLength === 1) {
    return ((a: any) => (fn as any)(...appliedArgs, a)) as any;
  }
  return ((a: any) => curry(fn, [a, ...appliedArgs], argLength - 1)) as any;
};
