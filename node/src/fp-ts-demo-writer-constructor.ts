/**
 * `Writer` represents computations that return a result with an accumulator.
 * Compare to state monad(quote from
 * https://stackoverflow.com/questions/23942890/is-the-writer-monad-effectively-the-same-as-the-state-monad):
 * > The difference is that `Writer` is much more limited,
 * > in that it doesn't allow you to read the accumulator(until you cash out at the end).
 * > The only thing you can perform with the state in a `Writer` is tack more stuff onto the end.
 * */
import assert from "assert";
import { array, writer } from "fp-ts";
import { Writer } from "fp-ts/Writer";

describe("running a writer", () => {
  it("should return the result and the accumulator", () => {
    // Construct a writer by providing result and accumulated state.
    const w: Writer<string[], number> = () => [0, ["0"]];
    expect(w()).toEqual([0, ["0"]]);
  });
});

describe("writer.tell", () => {
  it("should construct a `Writer` with the passed accumulator", () => {
    expect(writer.tell([])).toEqual([undefined, []]);
  });
});

describe("monad for writer", () => {
  it("should construct a `Writer` with the provided result and the accumulator provided by `Monoid`", () => {
    const monad = writer.getMonad(array.getMonoid<string>());
    assert.deepStrictEqual(monad.of(0), [0, []]);
  });
});

describe("writer.execute", () => {
  it("should return the accumulator of the `Writer`", () => {
    const w2: Writer<string[], number> = () => [0, ["0"]];
    expect(writer.execute(w2)).toEqual(["0"]);
  });
});

describe("writer.evaluate", () => {
  it("should return the result of the `Writer`", function () {
    const w3: Writer<string[], number> = () => [0, ["0"]];
    assert.deepStrictEqual(writer.evaluate(w3), 0);
  });
});
