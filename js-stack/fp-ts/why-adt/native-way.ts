export const foldNumberArray = (xs: number[]) =>
  xs.reduce((acc, x) => acc + x, 0);

export const foldStringArray = (xs: string[]) =>
  xs.reduce((acc, x) => acc + x, "");
