/**
 * When declare *this bound* function, **new object** is created and bind to it.
 * */
export function Constructor1() {}
function Constructor2() {}
const arrowFn = () => {};

// log: undefined {}
console.log(arrowFn.prototype, Constructor1.prototype);

/**
 *  Arrow function don not have `prototype`.
 * */

// log: false
console.log(Constructor1.prototype === Constructor2.prototype);
