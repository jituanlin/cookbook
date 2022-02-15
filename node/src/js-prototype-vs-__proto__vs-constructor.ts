/**
 * The standard way to get object 's [[prototype]](standard notation of js specification) is
 * `Object.getPrototypeOf`, via `__proto` is deprecated.
 * `prototype` is property of function. `__proto__` is property of object, `constructor` is property
 * of `prototype`.
 * */
export function Constructor1() {
}

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

// log: true false
console.log(
    Object.getPrototypeOf(obj1).constructor === Constructor1,
    Object.prototype.hasOwnProperty.call(obj1, 'constructor')
);
