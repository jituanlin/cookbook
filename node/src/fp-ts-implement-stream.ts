/**
 * Implement `Stream` in typescript.
 * @see: https://www.oreilly.com/library/view/functional-programming-in/9781617290657/
 * */
import {pipe} from 'fp-ts/function';
import {fold, Option} from 'fp-ts/Option';

export interface Cons<A> {
    head: () => A;
    tail: () => Stream<A>;
    readonly _tag: 'Cons';
}

export interface Empty<A> {
    readonly _tag: 'Empty';
}

export type Stream<A> = Cons<A> | Empty<A>;

export const cons = <A>(head: () => A, tail: () => Stream<A>): Cons<A> => ({
    head,
    tail,
    _tag: 'Cons',
});

export const empty: Empty<unknown> = {
    _tag: 'Empty',
};

export const foldRight =
    <A, B>(z: B, f: (a: A, b: () => B) => B) =>
        (s: Stream<A>): B => {
            switch (s._tag) {
                case 'Cons':
                    return f(s.head(), () => foldRight(z, f)(s.tail()));
                case 'Empty':
                    return z;
            }
        };

export const exist =
    <A>(p: (a: A) => boolean) =>
        (s: Stream<A>): boolean =>
            pipe(
                s,
                foldRight(false as boolean, (a, b) => p(a) || b())
            );

export const stream = <A>(...as: ReadonlyArray<A>): Stream<A> => {
    if (as.length === 0) {
        return empty;
    }
    const [head, ...tails] = as;
    return cons(
        () => head,
        () => stream(...tails)
    );
};

export const unfold = <A, S>(z: S, f: (z: S) => Option<[A, S]>): Stream<A> =>
    pipe(
        f(z),
        fold(
            () => empty as Stream<A>,
            ([a, z1]) =>
                cons(
                    () => a,
                    () => unfold(z1, f)
                )
        )
    );

export const take =
    (n: number) =>
        <A>(s: Stream<A>): Stream<A> => {
            switch (s._tag) {
                case 'Empty':
                    return s;
                case 'Cons':
                    if (n == 1) {
                        return cons(s.head, () => empty as Empty<A>);
                    } else {
                        return cons(s.head, () => take(n - 1)(s.tail()));
                    }
            }
        };

export const toArray = <A>(s: Stream<A>): ReadonlyArray<A> => {
    switch (s._tag) {
        case 'Empty':
            return [];
        case 'Cons':
            return [s.head(), ...toArray(s.tail())];
    }
};
