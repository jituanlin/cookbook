/**
 * The following code is a example showing Typescript3.7 support recursive type.
 * */

// work well after typescript3.7
type Tree<T> = {
  value: T;
  children: Tree<T>;
};
