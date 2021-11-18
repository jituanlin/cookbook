/**
 * The following code is an example to show rest element type inference bug before Typescript4.0.
 * */

/**
 * type error(before TS v4.0): A rest element type must be an array type.
 * work well(after TS v4.0).
 * see: https://github.com/microsoft/TypeScript/issues/26113
 * It is commented for escape from editor report.
 * */
// export type T<A> = A extends any[] ? [number, ...A] : never;
