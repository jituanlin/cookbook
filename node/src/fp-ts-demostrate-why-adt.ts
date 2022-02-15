interface Monoid<T> {
    empty: T;
    concat: (a: T, b: T) => T;
}

// With ADT
export const fold = <T>(xs: Array<T>, monoid: Monoid<T>) =>
    xs.reduce(monoid.concat, monoid.empty);

type Kind<URI extends URIS, A> = URItoKind<A>[URI];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface URItoKind<A> {
}

type URIS = keyof URItoKind<any>;

interface URItoKind<A> {
    Array: Array<A>;
}

interface Foldable<F extends URIS, A> {
    fold: <A>(fa: Kind<F, A>, monoid: Monoid<A>) => A;
}

const getFoldArray: <T>() => Foldable<'Array', T> = () => ({
    fold,
});

// Without ADT
export const foldNumberArray = (xs: number[]) =>
    xs.reduce((acc, x) => acc + x, 0);

export const foldStringArray = (xs: string[]) =>
    xs.reduce((acc, x) => acc + x, '');
