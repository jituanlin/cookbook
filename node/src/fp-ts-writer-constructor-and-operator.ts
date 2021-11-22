import * as fp from 'fp-ts';
import assert from 'assert';

const w1: fp.writer.Writer<string[], number> = () => [1, ['1']]; // construct a writer by providing `W` and `A`
assert.deepStrictEqual(w1(), [1, ['1']]);

const w2 = fp.writer.tell([]); // construct a writer by only providing `W`
assert.deepStrictEqual(w2(), [undefined, []]);

const mw = fp.writer.getMonad(fp.array.getMonoid<string>());
const w3 = mw.of(1); // construct a writer by providing an `A` and a `Monoid` instance of `W`, the `Monoid` is used to get `empty` of `W`
assert.deepStrictEqual(w3(), [1, []]);

const w4: fp.writer.Writer<string[], number> = () => [1, ['1']];
const w = fp.writer.execWriter(w4); // run writer for get `W`
assert.deepStrictEqual(w, ['1']);

const w5: fp.writer.Writer<string[], number> = () => [1, ['1']];
const a = fp.writer.evalWriter(w5); // run writer for get `A`
assert.deepStrictEqual(a, 1);

const w6: fp.writer.Writer<string[], number> = () => [1, ['1']];
const w7 = fp.writer.writer.map(w6, n => n + 1); // `map` operation could generate a new writer with new `A` by applying the old `A` to provided function
assert.deepStrictEqual(w7(), [2, ['1']]);

const w11: fp.writer.Writer<string[], number> = () => [1, ['1']];
const mw2 = fp.writer.getMonad(fp.array.getMonoid<string>());
const w12 = mw2.chain(w11, n => () => [n + 1, [String(n + 1)]]); // Use `chain` operation to perform those computation that will append new logs
assert.deepStrictEqual(w12(), [2, ['1', '2']]);

const w13: fp.writer.Writer<string[], number> = () => [1, ['1']];
const mw3 = fp.writer.getMonad(fp.array.getMonoid<string>());
const w14 = mw3.ap(() => [n => n + 1, ['ap on n']], w13); // `ap` operation is used to perform those computation that computation result is a another computation needs to be done
assert.deepStrictEqual(w14(), [2, ['ap on n', '1']]);
