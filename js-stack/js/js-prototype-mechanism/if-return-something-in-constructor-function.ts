/**
 * If constructor function not return anything, `new` operator will return `this`.
 * If constructor function returned is not object, `new` operator will return `this`.
 * If constructor function return object, `new` operator will return this object.
 * */

export function Constructor1() {
  return 42;
}

export function Constructor2() {
  return {
    n: 42,
  };
}

export function Constructor3() {
  this.n = 41;
  this.n2 = 43;
  return {
    n: 42,
  };
}

// log: Constructor1 {}
console.log(new (Constructor1 as any)());

// log: {n:42}
console.log(new (Constructor2 as any)());

// log: {n:42}
console.log(new (Constructor3 as any)());
