/**
 * When declare *this bound* function, **new object** is created(by something like Object.create)
 * and bind to it's `prototype`, and the `prototype` 's `constructor` is point to constructor function itself.
 * When manually change constructor function 's `prototype`, manually set `prototype` 's `constructor` property
 * is required.
 * Arrow function don not have `prototype`.
 * */
export function Constructor1() {}
function Constructor2() {}
const arrowFn = () => {};

// log: undefined {}
console.log(
  arrowFn.prototype,
  Constructor1.prototype,
  Constructor1.prototype.constructor
);

// log: false
console.log(Constructor1.prototype === Constructor2.prototype);
