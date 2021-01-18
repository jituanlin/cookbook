type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type Last<A extends any[]> = A extends [...(infer H), infer T] ? T : never;

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
