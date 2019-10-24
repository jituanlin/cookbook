/**
 * See: https://www.youtube.com/watch?v=sxudIMiOo68&ab_channel=Fun%28c%29tionalProgrammingGroup.
 * `tag-less-final` is a programming style that doesn't hardcode the *context*.
 * That makes it possible to inject multiple concrete implementations, which is the key to testing.
 * The goal of this methodology is pretty much the same as dependency injection in OOP.
 *
 * Implementation pattern:
 * 1. Modularize functions into multiple monadic ADTs(abilities).
 * 2. Compose those ADTs into an aggregated ADT.
 * 3. Leverage the abilities of aggregated ADT to implement the program.
 * */
import { IO } from "fp-ts/IO";
import { Kind, URIS } from "fp-ts/HKT";
import { Monad1 } from "fp-ts/lib/Monad";
import { console as console_, io } from "fp-ts";

interface Console<F extends URIS> {
  print: (n: number) => Kind<F, void>;
}

interface Random<F extends URIS> {
  random: Kind<F, number>;
}

/**
 * Just require the effect to be a monad (for continuous calculation),
 * instead of hard-coding the effect (IO, State, Writer, etc...).
 * */
interface Main<F extends URIS> extends Console<F>, Random<F>, Monad1<F> {}

// the `main` prints a random number.
const main = <F extends URIS>(P: Main<F>): Kind<F, void> => {
  return P.chain(P.random, P.print);
};

const program = (): IO<void> =>
  main<io.URI>({
    ...io.Monad,
    print: console_.log,
    random: () => 0,
  });

it("should log number in console", () => {
  // spyOn` is a traditional way to test side effects
  const spy = jest.spyOn(console, "log");
  program()();
  expect(spy).toBeCalledWith(0);
});
