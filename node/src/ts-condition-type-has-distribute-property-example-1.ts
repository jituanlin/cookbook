/**
 * TS 's conditional type has distribution property.
 * When the type be judged is a type variable, and the passed type is a union type,
 * the return type will also be a union type.
 * It's workflow is, every constituent is passed to type constructor,
 * and collect results to form the new union type.
 * */

type Boxed<T> = {
    _V: T;
};

type Boxed2<T> = T extends any
    ? {
        _V: T;
    }
    : never;

type Boxed3<T> = number extends any
    ? {
        _V: T;
    }
    : never;

/**
 * inferred as Boxed {
 *     _V : 1|2
 * }
 * */
type A = Boxed<1 | 2>;

/**
 * inferred as
 *  Boxed {
 *     _V : 1
 *  }|
 *  Boxed {
 *     _V : 1
 *  }
 *  distributely
 * */
type A1 = Boxed2<1 | 2>;

/**
 * inferred as Boxed {
 *     _V : 1|2
 * }
 * NOT distributely, because the type to be judged should be a type variable.
 * */
type A2 = Boxed3<1 | 2>;
