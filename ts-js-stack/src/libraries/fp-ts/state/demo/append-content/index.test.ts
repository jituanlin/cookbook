import {appendContent} from './index';
import * as F from 'fp-ts3';

describe('state/demo/basic', () => {
  test('appendContent', () => {
    expect(F.state.execute('')(appendContent)).toEqual('\n1');
    expect(F.state.evaluate('')(appendContent)).toEqual(2);
  });
});
