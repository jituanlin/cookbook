export const APIUtils = () => {
  const tracker: number[] = [];
  const api = async (xs: number[]) => {
    xs.forEach(x => tracker.push(x));
    return xs;
  };
  return [tracker, api] as const;
};
