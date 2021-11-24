/**
 * @see: https://www.youtube.com/watch?v=sxudIMiOo68&ab_channel=Fun%28c%29tionalProgrammingGroup
 *
 * Mental model:
 * Don't hard-code the computation _context_.
 * That makes it possible to inject multiple concrete implementations , which is the key to testing.
 * The goal of this methodology is _almost_ the same as dependency injection in OOP.
 *
 * Implementation steps:
 * 1. Modularize functions into Monadic ADT
 * 2. Compose these ADT to a `Program` ADT
 * 3. Make the `main` function to `Program` ADT.
 *    Leverage the `Program` ADT ability to implement the core logic in `main` function.
 * */
import {Kind, URIS} from 'fp-ts/HKT';
import {Monad1} from 'fp-ts/lib/Monad';
import {console as console_, readonlyArray, state, writer} from 'fp-ts';
import {IO, Monad} from 'fp-ts/IO';
import {pipe} from 'fp-ts/lib/function';
import {State} from 'fp-ts/State';
import {Writer} from 'fp-ts/Writer';

/**
 * we just require the effect to be a monad (used for continuous calculation),
 * instead of hard-coding the effect (IO, State, Writer, etc...)
 * */
interface Print<F extends URIS> extends Monad1<F> {
  print: (n: number) => Kind<F, void>;
}
// print a series of number but `tag less final`
const printNumbers =
  <F extends URIS>(P: Print<F>) =>
  (ns: number[]) => {
    return readonlyArray.traverse(P)(P.print)(ns);
  };

const printIO: Print<'IO'> = {
  ...Monad,
  print: console_.log,
};
// this is the `real` implementation of `printNumbers`
export const main4IO = (): IO<readonly void[]> =>
  pipe([1, 2, 3], printNumbers(printIO));

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    readonly ['StateNs']: state.State<number[], A>;
  }
}
// we set the `tag` as `State` for test `printNumbers`
const printState: Print<'StateNs'> = {
  ...state.Monad,
  /**
   * append the number to the state instead of log it
   * In short, this is a implementation for `Writer`
   * */
  print: (n: number) => (logs: number[]) => [undefined, [...logs, n]],
  URI: 'StateNs',
};

export const main4State = (): State<number[], readonly void[]> =>
  pipe([1, 2, 3], printNumbers(printState));

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
export const main4Writer = (): Writer<readonly number[], readonly void[]> =>
  pipe([1, 2, 3], printNumbers(printWriter));
