/**
 * Try to implement a elegant type signature for the pipe function.
 * But an unreasonable type error was thrown.
 * */
type Arrow<A = any, B = any> = (a: A) => B;

type ArrowEnd<R> = R extends Arrow<any, infer B> ? B : never;

type IsEmpty<T> = T extends never[] ? true : false;

type Head<T> = T extends [infer H, ...any] ? H : never;

type Tail<T> = T extends [any, ...infer R] ? R : never;

type Piper<A, F> = Head<F> extends Arrow<A, infer B>
  ? IsEmpty<Tail<F>> extends true
    ? F
    : Piper<B, Tail<F>>
  : never;

type Last<T> = T extends [...any, infer L] ? L : never;

export function pipeline<A, F extends Arrow[]>(
  a: A,
  ...functions: Piper<A, F>
): ArrowEnd<Last<F>> {
  return undefined as ArrowEnd<Last<F>>;
}

const v = pipeline(
  1,
  (s: number) => String(s),
  // @ts-expect-error TS2554: Expected 2 arguments, but got 3.
  (s: string) => '1'
);
