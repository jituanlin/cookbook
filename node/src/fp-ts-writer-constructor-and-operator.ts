import assert from 'assert';
import {array, writer} from 'fp-ts';
import {Writer} from 'fp-ts/Writer';
import {pipe} from 'fp-ts/function';

const w1: Writer<string[], number> = () => [1, ['1']]; // construct a writer by providing `W` and `A`
assert.deepStrictEqual(w1(), [1, ['1']]);

// construct a writer by only providing `W`
const w2 = writer.tell([]);
assert.deepStrictEqual(w2(), [undefined, []]);

const mw = writer.getMonad(array.getMonoid<string>());
// construct a writer by providing an `A` and a `Monoid` instance of `W`, the `Monoid` is used to
const w3 = mw.of(1);
// get `empty` of `W`
assert.deepStrictEqual(w3(), [1, []]);

const w4: Writer<string[], number> = () => [1, ['1']];
// run writer for get `W`
const w = writer.execute(w4);
assert.deepStrictEqual(w, ['1']);

const w5: Writer<string[], number> = () => [1, ['1']];
// run writer for get `A`
const a = writer.execute(w5);
assert.deepStrictEqual(a, 1);

const w6: Writer<string[], number> = () => [1, ['1']];
// `map` operation could generate a new writer with new `A`
// by applying the old `A` to provided function
const w7 = pipe(
  w6,
  writer.map(n => n + 1)
);
assert.deepStrictEqual(w7(), [2, ['1']]);

const w11: Writer<string[], number> = () => [1, ['1']];
const mw2 = writer.getMonad(array.getMonoid<string>());
// Use `chain` operation to perform those computation
const w12 = mw2.chain(w11, n => () => [n + 1, [String(n + 1)]]);
// that will append new logs
assert.deepStrictEqual(w12(), [2, ['1', '2']]);

const w13: Writer<string[], number> = () => [1, ['1']];
const mw3 = writer.getMonad(array.getMonoid<string>());
const w14 = mw3.ap(() => [n => n + 1, ['ap on n']], w13); // `ap` operation is used to perform those computation that
// computation result is a another computation needs to be done
assert.deepStrictEqual(w14(), [2, ['ap on n', '1']]);
