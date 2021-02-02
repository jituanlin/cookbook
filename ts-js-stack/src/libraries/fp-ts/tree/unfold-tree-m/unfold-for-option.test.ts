import {treeTaskOptionTitle} from './unfold-for-option';
import {none} from 'fp-ts/Option';

describe('unfold-for-option', () => {
  it('should return none ', function () {
    expect(treeTaskOptionTitle).toEqual(none);
  });
});
