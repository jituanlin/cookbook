import {treeTaskOptionTitle} from './fp-ts-tree-unfold-for-option';
import {none} from 'fp-ts/Option';

describe('unfold-for-option', () => {
  it('should return none ', function () {
    expect(treeTaskOptionTitle).toEqual(none);
  });
});
