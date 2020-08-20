/**
 * When modify primitive property on object, is not any impact with `__proto__`.
 * When modify object property on object, according to js is `share by copy of reference`,
 * it will:
 *  - if object own `property` bu itself, it will not affect `__proto__`, if property own by `__proto__` then:
 *      - if assign other object on that property, it will not modify `__proto__`.
 *      - if modify property inner that property, it will modify to `__proto__`
 * */
export function Constructor1() {
  this.value = 0;
}

Constructor1.prototype.value = 1;
Constructor1.prototype.data = {
  n: 43,
};

const obj1 = new (Constructor1 as any)();
obj1.value = 2;
// log: 2 1
console.log(obj1.value, obj1.__proto__.value);

obj1.data = {
  n: 44,
};
// log: 44 43
console.log(obj1.data.n, obj1.__proto__.data.n);

const obj2 = new (Constructor1 as any)();
obj2.data.n = 45;
// log: 45 45
console.log(obj2.data.n, obj2.__proto__.data.n);
