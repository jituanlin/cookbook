type DeferredAny<T> = T extends any ? any : any;

/**
 * type error: t cannot be assigned to DeferredAny<T>
 *
 * it not makes sense, because:
 * any is top type(meaning that all types are assignable to any),
 * so T is assignable to any, so is DeferredAny<T>
 *
 * the reason that is doesn't work:
 * deferred type cannot be assign to not-deferred type
 * */

// export const f = <T>(t:T):DeferredAny<T> => t

/**
 * best solution is just use `as any`.
 * joke solution is using function type overload to
 * use more permissive type signature in implementation.
 * */
function deffer<T>(a: T): T extends any ? T : T;
function deffer<T>(a: T): T {
    return a;
}

/**
 * more joke solution is using a function to turn
 * a not-deferred value to deferred type.
 * */
export const f = <T>(t: T): DeferredAny<T> => deffer(t);
