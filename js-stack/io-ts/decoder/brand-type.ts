import {pipe} from 'fp-ts/function';
import * as D from 'io-ts/decoder';
import * as fp from 'fp-ts';

export interface PositiveBrand {
  readonly Positive: unique symbol;
}

export type Positive = number & PositiveBrand;

export const Positive: D.Decoder<unknown, Positive> = pipe(
  D.number,
  D.refine((n): n is Positive => n > 0, 'Positive')
);

const p: Positive = fp.pipeable.pipe(
  Positive.decode(-1),
  fp.either.fold(
    () => 2 as Positive,
    a => a
  )
);

console.log(p);
