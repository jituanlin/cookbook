import {pipe} from 'fp-ts/function';
import {option} from 'fp-ts';

// with Do notation
pipe(
  option.some(1),
  option.bindTo('n'),
  option.bind('n1', ({n}) => (n === 0 ? option.none : option.some(100 / n))),
  option.map(({n1}) => n1),
  console.log
);

// without Do notation
pipe(
  option.some(1),
  option.chain(n => (n === 0 ? option.none : option.some(100 / n))),
  console.log
);
