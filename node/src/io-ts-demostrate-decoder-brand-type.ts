import * as D from 'io-ts/decoder';
import {pipe} from 'fp-ts/function';

interface AgeBrand {
    readonly Age: unique symbol;
}

type Age = number & AgeBrand;
const ageD = pipe(
    D.number,
    D.refine((input): input is Age => input > 0 && input < 130, 'Age'),
    D.withMessage(() => 'age must in range(0,130)')
);

pipe(140, ageD.decode, console.log);
