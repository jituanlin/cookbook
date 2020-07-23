const price = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

const R = require('ramda');

let n = 0;
const calcMaxProfitTopToBottom = R.memoize(length => {
  if (length === 1) return price[1];
  let profit = 0;
  for (let l = 1; l <= length; l++) {
    console.log(n++);
    profit = Math.max(price[l] + calcMaxProfitTopToBottom(length - l), profit);
  }
  return profit;
});

let n1 = 0;
const calcMaxProfitBottomToTop = length => {
  let result = [0, 1];
  for (let j = 1; j <= length; j++) {
    let p = 0;
    for (let i = 1; i <= j; i++) {
      console.log(n1++);
      p = Math.max(price[i] + result[j - i], p);
    }
    result[j] = p;
  }
  return result[length];
};

console.time('topToBottom');
console.log(
  calcMaxProfitTopToBottom(7) === 18,
  calcMaxProfitTopToBottom(8) === 22,
  calcMaxProfitTopToBottom(9) === 25
);
console.timeEnd('topToBottom');

console.time('bottomToTop');
console.log(
  calcMaxProfitBottomToTop(7) === 18,
  calcMaxProfitBottomToTop(8) === 22,
  calcMaxProfitBottomToTop(9) === 25
);
console.timeEnd('bottomToTop');
