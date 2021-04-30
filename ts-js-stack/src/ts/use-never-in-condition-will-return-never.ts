/**
 * output: 1
 * */
export type S1 = never extends number ? 1 : 0;

export type T1<T> = T extends number ? 1 : 0;

/**
 * output: never
 * Use `generic` never in condition express
 * will result never.
 * */
export type S2 = T1<never>;

/**
 * Only take effect on conditional `generic` never
 * */
type C<T> = number;
// output: number
export type CC = C<never>;
