/**
 * See ./src/fp-ts-demon-state-constructor.ts.
 * */
import assert from "assert";
import { pipe } from "fp-ts/function";
import { state } from "fp-ts";

{
  // `map` *modifies* the result of the computation and leaves the state unchanged.
  assert.deepStrictEqual(
    state.map((n: number) => n + 1)(state.of<number, number>(1))(20),
    [2, 20]
  );
}

{
  // `chain` produces a new `state` with new result with new state.
  const appendContent = pipe(
    state.gets((content: string) => content.split("\n").length),
    state.chain((lineCount) => (content) => [lineCount + 1, content + "\n1"])
  );
  assert.deepStrictEqual(state.execute("")(appendContent), "\n1");
  assert.deepStrictEqual(state.evaluate("")(appendContent), 2);
}
