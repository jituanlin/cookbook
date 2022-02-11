import {
  calcMaxProfitBottomToTop,
  calcMaxProfitTopToBottom,
} from './algorithm-rod-cut';

const price = [0, 1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

describe('rod-cut', () => {
  test('basic functionality test', () => {
    expect(calcMaxProfitTopToBottom(price, 7)).toBe(18);
    expect(calcMaxProfitBottomToTop(price, 7)).toBe(18);

    expect(calcMaxProfitTopToBottom(price, 8)).toBe(22);
    expect(calcMaxProfitBottomToTop(price, 8)).toBe(22);

    expect(calcMaxProfitTopToBottom(price, 9)).toBe(25);
    expect(calcMaxProfitBottomToTop(price, 9)).toBe(25);
  });
});
