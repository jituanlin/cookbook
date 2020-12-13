import * as D from 'io-ts/lib/Decoder';
import * as fp from 'fp-ts';

const genderD = D.withMessage(() => "gender should be 'male' or 'female'")(
  D.union(D.literal('male'), D.literal('female'))
);

fp.pipeable.pipe(
  'gender: male',
  genderD.decode,
  fp.either.mapLeft(e => {
    console.log(D.draw(e));
  })
);
