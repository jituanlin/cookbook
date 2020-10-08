/*
 *  Don' t call `Object.prototype` method such as `obj.hasOwnProperty('x')`, since `obj.__proto__`
 *  maybe not `object.prototype`. If `obj` is from JSON parse, doing so will leave
 *  hidden danger of malicious attack.
 * */
export const obj1 = {};
Object.prototype.hasOwnProperty.call(obj1, 'propertyName');
