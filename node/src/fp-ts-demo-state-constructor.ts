/**
 * `State monad` represents a computation that depends on a state and may change that state.
 * But in functional programming, mutation is side effect and breaks transparency reference.
 * Therefore, FP requires maintaining state explicitly by accepting it as parameter and returning it with result of
 * computation. The form (S)=>[S,A] is a symbolic representation of those computations, where `S` is the state and `A`
 * is the result of computation. Additionally, the state monad provides some useful functions to compose/construct that
 * kind of computation.
 */
import assert from "assert";
import { state } from "fp-ts";

{
  // `get` constructs a `State` that evaluates to the same state passed to.
  assert.deepStrictEqual(state.get()(1), [1, 1]);
}

{
  // `put` constructs a `State` whose state is fixed to the argument pass to the constructor.
  assert.deepStrictEqual(state.put(1)(3), [undefined, 1]);
}

{
  // `modify` constructs a `State` whose state be `modify` by function passed to constructor.
  assert.deepStrictEqual(state.modify((n: number) => n + 1)(4), [undefined, 5]);
}

{
  // `gets` constructs a `State` that `get` the result from the passed state.
  assert.deepStrictEqual(state.gets((n: number) => n + 1)(3), [4, 3]);
}

{
  // `evaluate` gets the result of computation.
  assert.deepStrictEqual(
    state.evaluate(1)(state.gets((n: number) => n + 1)),
    2
  );
}

{
  // `execute` gets the current state of computation.
  assert.deepStrictEqual(state.execute(1)(state.gets((n: number) => n + 1)), 1);
}
