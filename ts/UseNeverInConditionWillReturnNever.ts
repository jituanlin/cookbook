/**
 * output: 1
 * */
type S1 = never extends number ? 1 : 0;

type T1<T> = T extends number ? 1 : 0;

/**
 * output: never
 *  Use `generic` never in condition express
 *  will return never
 * */
type S2 = T1<never>;
