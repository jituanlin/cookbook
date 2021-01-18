import * as F from 'fp-ts3';
import assert from 'assert';

const MonadLog = F.writer.getMonad(F.monoid.monoidString);

export const manipulateNumber = F.function.pipe(
  F.writer.tell(''),
  MonadLog.chain(() => () => [1, 'init with 1\n']),
  MonadLog.chain(n => () => [n + 1, '+1\n']),
  MonadLog.chain(n => () => [n + 2, '+2\n'])
);

assert.deepStrictEqual(manipulateNumber(), [4, 'init with 1\n+1\n+2\n']);
