/**
 * Actual `pipe` operator,
 * but without introduce any function(`pipe`,`compose`),
 * for anybody who **scare** functional programming
 * */

const From = (xs: number[]) => ({
    inc: () => Inc(xs),
});

const Inc = (xs: number[]) => ({
    filter: () => Filter(xs.map(x => x + 1)),
});

const Filter = (xs: number[]) => xs.filter(x => x > 0);

const result = From([-2, -1, 0, 1])
    .inc()
    .filter();

console.log(result);
