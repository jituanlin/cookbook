/**
 * The standard way to get object 's [[prototype]](standard notation of js specification) is
 * `Object.getPrototypeOf`, via `__proto` is deprecated.
 *  `prototype`, `constructor` are property of function. `__proto__` is property of object.
 *  Dont call `Object.prototype` method suck as `obj.hasOwnProperty('x')`, since `obj.__proto__`
 *  maybe not `object.prototype`. If `obj` is from JSON parse, doing so will leave
 *  hidden danger of malicious attack.
 * */
export function Constructor1() {}

const obj1 = new (Constructor1 as any)();

// log: true
console.log(obj1.__proto__ === Object.getPrototypeOf(obj1));

/**
 * `prototype` is property of `function`, not `object`.
 * */

// log: {} undefined
console.log(Constructor1.prototype, obj1.prototype);

/**
 * object 's constructor refer to it's constructor
 * */

// log true false
console.log(
  obj1.constructor === Constructor1,
  Object.prototype.hasOwnProperty.call(obj1, 'constructor')
);
