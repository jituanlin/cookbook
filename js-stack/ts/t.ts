const f = (n: number) => {
  if (n > 0) {
    return n;
  }
  return undefined;
};

const n = f(1) + 1;
console.log(n)