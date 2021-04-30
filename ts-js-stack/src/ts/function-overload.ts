export function f(a: number): number;
export function f(a: string): string;
/**
 * function with implement not be consider as type declaration
 * so `any => any` is not f 's function type
 * */
export function f(a: any): any {
  return a;
}

/**
 * type error:
 * TS2769: No overload matches this call.
 * */
// f({});
