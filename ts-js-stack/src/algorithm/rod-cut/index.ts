import * as R from 'ramda';

export const calcMaxProfitTopToBottom = R.memoizeWith(
  (price: number[], length: number) => JSON.stringify({price, length}),
  (price: number[], length: number) => {
    if (length === 1) return price[1];
    let profit = 0;
    for (let l = 1; l <= length; l++) {
      profit = Math.max(
        price[l] + calcMaxProfitTopToBottom(price, length - l),
        profit
      );
    }
    return profit;
  }
);

export const calcMaxProfitBottomToTop = (price: number[], length: number) => {
  const result = [0, 1];
  for (let j = 1; j <= length; j++) {
    let p = 0;
    for (let i = 1; i <= j; i++) {
      p = Math.max(price[i] + result[j - i], p);
    }
    result[j] = p;
  }
  return result[length];
};
