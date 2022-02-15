export function f(a: number): number;
export function f(a: string): string;
/**
 * The type signature of final implementation is not consider as overload,
 * so `any => any` is not f 's function type
 * */
export function f(a: any): any {
    return a;
}

// @ts-expect-error: TS2769: No overload matches this call.
f({});
