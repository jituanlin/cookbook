/**
 * Is actually the "pipe" operator,
 * But it did not introduce any functions (`pipe`, `compose`),
 * For anyone who is afraid of functional programming ^ _ ^.
 **/

const From = (xs: number[]) => ({
  inc: () => Inc(xs),
});

const Inc = (xs: number[]) => ({
  filter: () => Filter(xs.map(x => x + 1)),
});

const Filter = (xs: number[]) => xs.filter(x => x > 0);

const result = From([-2, -1, 0, 1]).inc().filter();

console.log(result);
