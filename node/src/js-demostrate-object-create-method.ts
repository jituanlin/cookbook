/**
 * `Object.create` is used to create object with setting `__proto__`,
 * and optionally specify another object to copy it's own enumerable **property descriptors**
 * to new created object.
 * When pass `null` as prototype, the new created object has not any method
 * inherit from `Object.prototype`, such `toString`, `valueOf` etc.
 * To attach this method, one solution is `Object.setPrototypeOf(obj,Object.prototype).
 * */

const originObj = {
    n: 42,
};

const obj1 = Object.create(originObj, {
    n2: {
        get() {
            return 43;
        },
    },
});

// log: 43 42
console.log(obj1.n2, obj1.n);

const obj2 = Object.create(null);

// log: [Object: null prototype] {} (in nodejs@14.6.0)
console.log(obj2);

// log: undefined
console.log(obj2.toString);

// log: Cannot convert object to primitive value
try {
    console.log(obj2 + '');
} catch (e) {
    console.log(JSON.stringify(e));
}

Object.setPrototypeOf(obj2, Object.prototype);
// log: [Function: toString]
console.log(obj2.toString);

// log: [object Object]
console.log(obj2 + '');
