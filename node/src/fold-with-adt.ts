interface Monoid<T> {
  empty: T;
  concat: (a: T, b: T) => T;
}

export const fold = <T>(xs: Array<T>, monoid: Monoid<T>) =>
  xs.reduce(monoid.concat, monoid.empty);

/**
 * // Typescript不支持higher kind type
 * interface Foldable<F> {
 *      // 类型错误: Type 'F' is not generic.
 *      fold: <A>(fa: F<A>, monoid: Monoid<A>) => A;
 *  }
 * */

type Kind<URI extends URIS, A> = URItoKind<A>[URI];
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface URItoKind<A> {}
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
