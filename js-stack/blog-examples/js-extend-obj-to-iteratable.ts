const obj = {};

obj[Symbol.iterator] = () => {
  let idx = 0;
  return {
    next() {
      if (idx > 3) {
        return {done: true};
      }
      return {
        done: false,
        value: idx++,
      };
    },
  };
};

// @ts-ignore
for (const v of obj) {
  console.log(v);
}
