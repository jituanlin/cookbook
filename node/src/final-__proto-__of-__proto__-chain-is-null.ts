/**
 * `new Object()` has `__proto__` which has `toString`, `valueOf` property,
 * and `(new Object()).__proto__.__proto__` is null, null is the final `__proto__`
 * of `__proto__` chain.
 *
 * `new Object()` is same as `{}`.
 * */

// log: null
console.log(({} as any).__proto__.__proto__);
