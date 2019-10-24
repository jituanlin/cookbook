import assert from "assert";
import { Writer } from "fp-ts/Writer";
import { array, writer } from "fp-ts";
import { pipe } from "fp-ts/function";

describe("writer.map", () => {
  it("should modify the value inside the `Writer`", () => {
    const w: Writer<string[], number> = () => [1, ["1"]];
    assert.deepStrictEqual(
      pipe(
        w,
        writer.map((n) => n + 1)
      ),
      [2, ["1"]]
    );
  });
});

describe("(monad for writer).chain", () => {
  it("should modify the result and concat the accumulator", () => {
    const w: Writer<string[], number> = () => [1, ["1"]];
    const monad = writer.getMonad(array.getMonoid<string>());
    expect(monad.chain(w, (n) => () => [n + 1, [String(n + 1)]])()).toEqual([
      2,
      ["1", "2"],
    ]);
  });
});

describe("(monad for writer).ap", () => {
  it("should apply the function in the `Writer` to the value in the other writer", () => {
    const w: Writer<string[], number> = () => [1, ["1"]];
    const monad = writer.getMonad(array.getMonoid<string>());
    expect(monad.ap(() => [(n) => n + 1, ["ap on n"]], w)).toEqual([
      3,
      ["1", "2"],
    ]);
  });
});
