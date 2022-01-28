// TODO(jituanlin): replace it with jest.spy
export const getApiAndTracker = (): [
  number[],
  (xs: number[]) => Promise<number[]>
] => {
  const tracker: number[] = [];
  const api = async (xs: number[]) => {
    xs.forEach(x => tracker.push(x));
    return xs;
  };
  return [tracker, api];
};
