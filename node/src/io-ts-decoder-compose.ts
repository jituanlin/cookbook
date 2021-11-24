import * as D from 'io-ts/lib/Decoder';
import {pipe} from 'fp-ts/function';

// compose is short-circuited
const decoder = D.compose(D.string)(D.literal('1'));

/*
 {
 _tag: 'Left',
 left: { _tag: 'Of', value: { _tag: 'Leaf', actual: 1, error: '"1"' } }
 }
 */
pipe(1, decoder.decode, console.log);
