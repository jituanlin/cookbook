/**
 * Because in `fp-ts`, the `WriterT` is currently missing.
 * And `Writer` can only represent `Id` effect (no effect actually) computation,
 * so flowing example is a bit boring.
 * Use `WriterT` to record side effect actions is more useful.
 * */

import * as fp from 'fp-ts';
import assert from 'assert';

/**
 * In following example, we perform a sequence of computation from `originalNumber`,
 * use `Writer`, we not only get the final result but also the log of actions
 * to attract how the final value be got
 * In the following example, we perform a series of computation starting from `originalNumber`.
 * By using `Writer`, we can not only get the final result, but also the operation log
 * */
const originalNumber = 0;
const originalWriter: fp.writer.Writer<string[], number> = () => [
  originalNumber,
  ['init'],
];
const writerMonadStringArray = fp.pipeable.pipeable(
  fp.writer.getMonad(fp.array.getMonoid<string>())
);
const [finalNumber, log] = fp.pipeable.pipe(
  originalWriter,
  writerMonadStringArray.chain(n => () => [n + 1, ['add 1']]),
  writerMonadStringArray.chain(n => () => [42, ['re init to 42']])
)();

assert.deepStrictEqual(finalNumber, 42);
assert.deepStrictEqual(log, ['init', 'add 1', 're init to 42']);
