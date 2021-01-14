import * as F from 'fp-ts3';

// with Do notation
F.function.pipe(
  F.option.some(1),
  F.option.bindTo('n'),
  F.option.bind('n1', ({n}) =>
    n === 0 ? F.option.none : F.option.some(100 / n)
  ),
  F.option.map(({n1}) => n1),
  console.log
);

// without Do notation
F.function.pipe(
  F.option.some(1),
  F.option.chain(n => (n === 0 ? F.option.none : F.option.some(100 / n))),
  console.log
);
