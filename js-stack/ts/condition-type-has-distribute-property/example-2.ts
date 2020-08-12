/**
 * Continue from example-1.
 * */

type Diff<A, B> = A extends B ? never : A;

// inferred as 2|3
type T = Diff<1 | 2 | 3, 1>;
