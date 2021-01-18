const f = (a: string) => 42;
const f2 = (a: never) => 42;

// Pass, because TS will not check value of `any` type, except the expected type is `never`.
f(42 as any);

/**
 * Type error, because the expected type is `never`.
 * It is commented for escape from editor report.
 * */
// f2(42 as any);
