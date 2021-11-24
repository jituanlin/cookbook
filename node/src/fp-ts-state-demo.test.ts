import {appendContent} from './fp-ts-state-demo';
import {state} from 'fp-ts';

describe('state/demo/basic', () => {
  test('appendContent', () => {
    expect(state.execute('')(appendContent)).toEqual('\n1');
    expect(state.evaluate('')(appendContent)).toEqual(2);
  });
});
