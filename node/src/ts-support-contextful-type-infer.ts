import {pipe} from 'fp-ts/function';

const f =
    <T>() =>
        (a: T) =>
            a;

// f1: unknown => unknown (because typescript is not idea about what `T` is)
const f1 = f();

// r1: unknown => unknown (f1 's type is `resolved`, `T` has referred to unknown)
const r1 = f1(1);

/**
 * pipe: <A, B>(a: A, ab: (a: A) => B): B
 *
 * (typescript version: 4.1.3)
 * however, when put `f()` in a *type infer context* that
 * require `f()` to match type `number => B`
 * `f<T>()` 's T will be referred as `number`.
 *
 * It 's intuitive, in that context, only `f<T>()` 's
 * T be inferred as `number` can the whole type satisfies the requirement.
 * So, typescript replace unknown with number.
 * */
const r2 = pipe(1, f());
