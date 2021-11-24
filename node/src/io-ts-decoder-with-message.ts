import * as D from 'io-ts/lib/Decoder';
import * as fp from 'fp-ts';
import {pipe} from 'fp-ts/function';

const genderD = D.withMessage(() => "gender should be 'male' or 'female'")(
  D.union(D.literal('male'), D.literal('female'))
);

pipe(
  'gender: male',
  genderD.decode,
  fp.either.mapLeft(e => {
    console.log(D.draw(e));
  })
);
