import * as F from 'fp-ts3';

const MonadLog = F.writer.getMonad(F.monoid.monoidString);

const main = () => {
  F.function.pipe(
    F.writer.tell(''),
    MonadLog.chain(() => () => [1, 'init with 1\n']),
    MonadLog.chain(n => () => [n + 1, '+1\n']),
    MonadLog.chain(n => () => [n + 2, '+2\n']),
    w => w(),
    console.log
  );
};

// log:  [4, 'init with 1\n+1\n+2\n']
main();
