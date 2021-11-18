/**
 * whether the type parameter of type constructor  is covariant or contravariant depend on
 * where is it.
 * */

export type Covariant<A> = {
  value: A; // covariant position
};
// true, because covariant
type T = Covariant<number> extends Covariant<number | string> ? true : false;

type ContraVariant<A> = (a: A) => void;
// false, when "strictFunctionTypes": false turn on, because contravariant
type T1 = ContraVariant<number> extends ContraVariant<number | string>
  ? true
  : false;
