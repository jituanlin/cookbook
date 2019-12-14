/**
 * writer is represent for computation not only return result(hereinafter referred as `A`)
 * but also along with a other value(referred as `W`) such as *log*
 * compare to state monad:(quote from https://stackoverflow.com/questions/23942890/is-the-writer-monad-effectively-the-same-as-the-state-monad)
 * > The difference is that Writer is much more limited,
 * in that it doesn't allow you to read the accumulated state
 * (until you cash out at the end).
 * The only thing you can do with the state in a Writer is
 * tack more stuff onto the end.
 *
 * todo:
 * bypass the `listen`, `listens`, `pass` examples.
 * I can't find any *meaningful* example of them for now
 * */

import * as fp from "fp-ts";
import * as assert from "assert";

/* construct a writer */

// create a writer by provide `W` and `A`
const w1: fp.writer.Writer<string[], number> = () => [1, ["1"]];
assert.deepEqual(w1(), [1, ["1"]]);

// create a writer by only provide `W`
const w2 = fp.writer.tell([]);
assert.deepEqual(w2(), [undefined, []]);

// create a writer by provide a fixed `A` and a `Monoid` instance of `W` for get `empty` of `W`
const mw = fp.writer.getMonad(fp.array.getMonoid<string>());
const w3 = mw.of(1);
assert.deepEqual(w3(), [1, []]);

/* --- */

/* writer is *lazy*, so we need *run* it to get `A` or `W` */

// for get `W`
const w4: fp.writer.Writer<string[], number> = () => [1, ["1"]];
const w = fp.writer.execWriter(w4);
assert.deepEqual(w, ["1"]);

// for get `A`
const w5: fp.writer.Writer<string[], number> = () => [1, ["1"]];
const a = fp.writer.evalWriter(w5);
assert.deepEqual(a, 1);

/* --- */

/* transform on writer */

// `map` operation could generate a new writer with new `A` by applying the old `A` to provided function
const w6: fp.writer.Writer<string[], number> = () => [1, ["1"]];
const w7 = fp.writer.writer.map(w6, n => n + 1);
assert.deepEqual(w7(), [2, ["1"]]);

// `chain` operation generate a new writer with new `A` and `W` by
// applying the old `A` to provided function for get new `A` and part of new `W` (referred as `WP`)
// then new `W` is consist of old `W` and `WP`
// it is useful when do a action
//  which generate new `A` and `W` on `A` of a writer,
const w11: fp.writer.Writer<string[], number> = () => [1, ["1"]];
const mw2 = fp.writer.getMonad(fp.array.getMonoid<string>());
const w12 = mw2.chain(w11, n => () => [n + 1, [String(n + 1)]]);
assert.deepEqual(w12(), [2, ["1", "2"]]);

// `ap` operation is useful when applying a computation in a writer(`fab`) to other writer(`fa`)
// the generated writer has a `A` from (a->b)(a),
// and a `W` by concat two generated `W` from run `fab` and `fa`
const w13: fp.writer.Writer<string[], number> = () => [1, ["1"]];
const mw3 = fp.writer.getMonad(fp.array.getMonoid<string>());
const w14 = mw3.ap(() => [n => n + 1, ["ap on n"]], w13);
assert.deepEqual(w14(), [2, ["ap on n", "1"]]);

/* --- */

/**
 * example:
 * because in `fp-ts`, the `WriterT` is missing for now.
 * and `Writer` can only represent `Id` effect (no effect actually)
 * computation, so flowing example is a bit boring.
 * use `WriterT` to record side effect actions is more *real world*,
 * */

/**
 * in following example, we do a sequence of computation from `originalNumber`,
 * use `Writer`, we not only get the final result but also he log of actions
 * to attract how the final value be got
 * */
const originalNumber = 0;
const originalWriter: fp.writer.Writer<string[], number> = () => [
  originalNumber,
  [`init`]
];
const writerMonadStringArray = fp.pipeable.pipeable(
  fp.writer.getMonad(fp.array.getMonoid<string>())
);
const [finalNumber, log] = fp.pipeable.pipe(
  originalWriter,
  writerMonadStringArray.chain(n => () => [n + 1, ["add 1"]]),
  writerMonadStringArray.chain(n => () => [42, ["re init to 42"]])
)();

assert.deepEqual(finalNumber, 42);
assert.deepEqual(log, [`init`, "add 1", "re init to 42"]);

/* --- */
