import assert from 'assert';
import {Kind, URIS} from 'fp-ts/HKT';
import {Monad1} from 'fp-ts/lib/Monad';
import {option, readonlyArray, console as console_, state, writer} from 'fp-ts';
import {Monad} from 'fp-ts/IO';
import {pipe} from 'fp-ts/lib/function';

interface Print<F extends URIS> extends Monad1<F> {
  print: (n: number) => Kind<F, void>;
}

const fizz = <F extends URIS>(P: Print<F>) => (ns: number[]) => {
  if (ns.length === 0) {
    return option.none;
  }
  const [head, ...tail] = ns;
  const r = readonlyArray.reduce(
    P.print(head),
    (acc, n: number) => P.chain(() => P.print(n))(acc),
    tail
  );
  return option.some(r);
};

const printIO: Print<'IO'> = {
  ...Monad,
  print: console_.log,
};

const main = pipe(
  [1, 2, 3, 4, 5, 6],
  fizz(printIO),
  option.getOrElse(() => console.log('input array is empty'))
);

// main();

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly ['StateNs']: state.State<number[], A>;
  }
}

const printState: Print<'StateNs'> = {
  ...state.Monad,
  print: (n: number) => (logs: number[]) => [undefined, [...logs, n]],
  URI: 'StateNs',
};

const test4State = () => {
  const ns = [1, 2, 3, 4, 5, 6];
  pipe(
    ns,
    fizz(printState),
    option.map(state => {
      assert.deepStrictEqual(state.execute<number[]>([])(state), ns);
      console.log('state unit test pass');
    })
  );
};

// test4State();

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly ['WriterNs']: writer.Writer<readonly number[], A>;
  }
}
const printWriter: Print<'WriterNs'> = {
  ...writer.getMonad(readonlyArray.getMonoid<number>()),
  print: (n: number) => () => [undefined, [n]],
  URI: 'WriterNs',
};

const test4Writer = () => {
  const ns = [1, 2, 3, 4, 5, 6];
  pipe(
    ns,
    fizz(printWriter),
    option.map(state => {
      assert.deepStrictEqual(writer.execute(state), ns);
      console.log('writer unit test pass');
    })
  );
};

// test4Writer();
