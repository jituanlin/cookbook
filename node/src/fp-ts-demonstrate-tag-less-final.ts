/**
 * see: https://www.youtube.com/watch?v=sxudIMiOo68&ab_channel=Fun%28c%29tionalProgrammingGroup
 * `tag-less-final` is a programming style that doesn't hardcode the _context_.
 * That makes it possible to inject multiple concrete implementations, which is the key to testing.
 * The goal of this methodology is pretty much the same as dependency injection in OOP.
 *
 * Implementation steps:
 * 1. Modularize functions into multiple monadic ADTs(abilities)
 * 2. Compose those ADTs into an aggregated ADT
 * 3. Leverage the aggregated ADT ability to implement the logic of the program.
 * */
import {Kind, URIS} from 'fp-ts/HKT';
import {Monad1} from 'fp-ts/lib/Monad';
import {console as console_, io, random} from 'fp-ts';
import {IO} from 'fp-ts/IO';

/**
 * we just require the effect to be a monad (for continuous calculation),
 * instead of hard-coding the effect (IO, State, Writer, etc...)
 * */
interface Console<F extends URIS> {
    print: (n: number) => Kind<F, void>;
}

interface Random<F extends URIS> {
    random: Kind<F, number>;
}

interface Main<F extends URIS> extends Console<F>, Random<F>, Monad1<F> {
}

// print a random number but `tag less final`
const main = <F extends URIS>(P: Main<F>): Kind<F, void> => {
    return P.chain(P.random, P.print);
};

export const main4IO = (): IO<void> =>
    main<io.URI>({
        ...io.Monad,
        print: console_.log,
        random: random.random,
    });
