/**
 * Implement curring function.
 * */

const curring = (f, filledArgs = []) => {
  return (...args) => {
    const filledArgs$ = filledArgs.concat(args);
    return f.length === filledArgs$.length
      ? f(...filledArgs$)
      : curring(f, filledArgs$);
  };
};

const add3 = (x, y, z) => x + y + z;
const curriedAdd3 = curring(add3);
console.log(curriedAdd3(1, 2, 3));
console.log(curriedAdd3(1)(2, 3));
console.log(curriedAdd3(1, 2)(3));
console.log(curriedAdd3(1)(2)(3));
