import {pipe} from 'ramda';

export function flow<A, B>(a: A, f1: (a: A) => B): B;
export function flow<A, B, C>(a: A, f1: (a: A) => B, f2: (b: B) => C): C;
export function flow<A, B, C, D>(
    a: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D
): D;
export function flow<A, B, C, D, E>(
    a: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (e: D) => E
): E;
export function flow<A, B, C, D, E, F>(
    a: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => E,
    f5: (e: E) => F
): F;
export function flow<A, B, C, D, E, F, G>(
    a: A,
    f1: (a: A) => B,
    f2: (b: B) => C,
    f3: (c: C) => D,
    f4: (d: D) => E,
    f5: (e: E) => F,
    f6: (f: F) => G
): G;
export function flow(a: any, ...fns: Array<(arg: any) => any>) {
    return (pipe as any)(...fns)(a);
}
