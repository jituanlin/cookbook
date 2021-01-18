export type O = {
  a: number;
};

// type error: Object literal may only specify known properties
/**
 * const obj: O = {
 * a: 1,
 * b: 2,
 *};
 */

const obj1 = {
  a: 1,
  b: 2,
};

// OK without type error, since obj1 is not object literal
const b: O = obj1;
