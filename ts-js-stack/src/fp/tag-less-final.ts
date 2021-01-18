import * as F from 'fp-ts3';
import assert from 'assert';

interface Print<F extends F.hkt.URIS> extends F.monad.Monad1<F> {
  print: (n: number) => F.hkt.Kind<F, void>;
}

const fizz = <F extends F.hkt.URIS>(P: Print<F>) => (ns: number[]) => {
  if (ns.length === 0) {
    return F.option.none;
  }
  const [hd, ...tl] = ns;
  const r = F.readonlyArray.reduce(P.print(hd), (acc, n: number) =>
    P.chain(() => P.print(n))(acc)
  )(tl);
  return F.option.some(r);
};

const printIO: Print<'IO'> = {
  ...F.io.Monad,
  print: F.console.log,
};

const main = F.function.pipe(
  [1, 2, 3, 4, 5, 6],
  fizz(printIO),
  F.option.getOrElse(() => F.console.log('input array is empty'))
);

// main();

declare module 'fp-ts3/lib/HKT' {
  interface URItoKind<A> {
    readonly ['StateNs']: F.state.State<number[], A>;
  }
}

const printState: Print<'StateNs'> = {
  ...F.state.Monad,
  print: (n: number) => (logs: number[]) => [undefined, [...logs, n]],
  URI: 'StateNs',
};

const test4State = () => {
  const ns = [1, 2, 3, 4, 5, 6];
  F.function.pipe(
    ns,
    fizz(printState),
    F.option.map(state => {
      assert.deepStrictEqual(F.state.execute<number[]>([])(state), ns);
      console.log('state unit test pass');
    })
  );
};

// test4State();

declare module 'fp-ts3/lib/HKT' {
  interface URItoKind<A> {
    readonly ['WriterNs']: F.writer.Writer<readonly number[], A>;
  }
}
const printWriter: Print<'WriterNs'> = {
  ...F.writer.getMonad(F.readonlyArray.getMonoid<number>()),
  print: (n: number) => () => [undefined, [n]],
  URI: 'WriterNs',
};

const test4Writer = () => {
  const ns = [1, 2, 3, 4, 5, 6];
  F.function.pipe(
    ns,
    fizz(printWriter),
    F.option.map(state => {
      assert.deepStrictEqual(F.writer.execute(state), ns);
      console.log('writer unit test pass');
    })
  );
};

// test4Writer();
