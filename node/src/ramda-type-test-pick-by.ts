import {filter, is, pickBy, pipe, startsWith} from 'ramda';
import {flow} from './ts-flow-implementation';

const value1 = pickBy(startsWith('private_'), {
  privateName: '[test]:privateName1',
});

const value2 = pickBy(startsWith('private_'))({
  privateName: '[test]:privateName1',
});

const value3 = pipe(
  pickBy(startsWith('private_')),
  filter(is(String))
)({privateName: '[test]:privateName1'});

const value4 = flow(
  {privateName: '[test]:privateName1'},
  pickBy(startsWith('private_')),
  filter(is(String))
);
