import * as F from 'fp-ts';
import * as M from 'monocle-ts';
import {modifyF4Lens} from './index';

describe('modify f', () => {
  test('modifyF in Lens', () => {
    interface Account {
      name: string;
    }

    const nameM: M.Lens<Account, string> = M.Lens.fromProp<Account>()('name');
    const nameModified = modifyF4Lens(F.option.Functor)(name =>
      F.option.some(`${name}Modified`)
    )(nameM)({name: 'monocle'});

    expect(nameModified).toEqual(F.option.some({name: 'monocleModified'}));
  });
});
