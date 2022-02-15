/**
 * Writer represents those calculations that not only return the result (denoted as "A") but also accumulate other
 * values (denoted as "W"). Compare to state monad(quote from
 * https://stackoverflow.com/questions/23942890/is-the-writer-monad-effectively-the-same-as-the-state-monad):
 * > The difference is that Writer is much more limited,
 * > in that it doesn't allow you to read the accumulated state
 * > (until you cash out at the end).
 * > The only thing you can perform with the state in a Writer is
 * > tack more stuff onto the end.
 * */
import assert from 'assert';
import {array, writer} from 'fp-ts';
import {Writer} from 'fp-ts/Writer';

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
