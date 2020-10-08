/**
 * We say class(constructor function) `A` is inherit another class `B` if:
 *  > A.prototype directly or indirectly link to B.prototype.
 * When declare a constructor function, js will create a object from `Object.create`
 * and set it as constructor function 's `prototype`, and set this `prototype` 's `constructor`
 * to constructor function itself.
 * However, when we set `prototype` manually, we should ensure that `prototype` is
 * point to correct constructor function.
 * Using an intermediate object to bind the `prototype` of the subclass constructor
 * is a good idea to isolate the `prototype` of the superclass from
 * adding new properties of the subclass or
 * modifying the original properties of the subclass.
 * It prevent potential *prototype pollution*.
 * */
export function Parent() {}
Parent.prototype.parentMethod = function parentMethod() {};

// log: [Function: Parent]
console.log(Parent.prototype.constructor);

function Child() {
  Parent.call(this);
}

Child.prototype = Object.create(Parent.prototype);

const obj = new (Child as any)();

// [Function: Parent]
console.log(obj.__proto__.constructor);

Child.prototype.constructor = Child; // return original constructor to Child
