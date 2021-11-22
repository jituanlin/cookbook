/**
 * see: https://stackoverflow.com/questions/54520676/in-typescript-how-to-get-the-keys-of-an-object-type-whose-values-are-of-a-given
 * */

/**
 * original answer is:
 * type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
 * the `-?` is not required
 * */
type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type A = {
  a: string;
  b: number;
  c: never;
};

type TT = KeysMatching<A, number>;
