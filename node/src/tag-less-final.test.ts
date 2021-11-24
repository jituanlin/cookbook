import {main4IO, main4State, main4Writer} from './tag-less-final';
import {state, writer} from 'fp-ts';
import {pipe} from 'fp-ts/function';

describe('tag less final/main', function () {
  it('should log number in console', function () {
    // in order to test whether side effects are executed, `spyOn` is the traditional method
    const spy = jest.spyOn(console, 'log');
    main4IO()();
    expect(spy).nthCalledWith(1, 1);
    expect(spy).nthCalledWith(2, 2);
    expect(spy).nthCalledWith(3, 3);
  });
});

describe('tag less final/main4State', function () {
  it('should collect all logged number as final state', function () {
    const logs = pipe(main4State(), state.execute([]));
    expect(logs).toEqual([1, 2, 3]);
  });
});

describe('tag less final/main4Writer', function () {
  it('should collect all logged number as final state', function () {
    const logs = pipe(main4Writer(), writer.execute);
    expect(logs).toEqual([1, 2, 3]);
  });
});
