/**
 * Malicious client can inject `__proto__` into JSON.
 * If server code do not handle that case,
 * it maybe pollute `Object.prototype`.
 * In latest nodejs or Chrome, `__proto__` in JSON will be ignore.
 * */

const clientJSON = `{"__proto__": {"isAdmin": true}}`;

const clientObj = JSON.parse(clientJSON);
const merge = (
    source: Record<string, unknown>,
    target: Record<string, unknown>
) => {
    for (const attr in source) {
        if (typeof target[attr] === 'object' && typeof source[attr] === 'object') {
            merge((target as any)[attr], (source as any)[attr]);
        } else {
            target[attr] = source[attr];
        }
    }
    return target;
};

merge(clientObj, {role: 'user'});

// log: true, in old js engine, undefined in latest nodejs
console.log(({} as any).isAdmin);
