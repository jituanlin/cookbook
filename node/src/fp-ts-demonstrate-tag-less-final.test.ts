import {main4IO,} from './fp-ts-demonstrate-tag-less-final';

describe('tag less final/main', function () {
    it('should log number in console', function () {
        // in order to test whether side effects are executed, `spyOn` is the traditional way to do it
        const spy = jest.spyOn(console, 'log');
        main4IO()();
        expect(spy).nthCalledWith(1, 1);
        expect(spy).nthCalledWith(2, 2);
        expect(spy).nthCalledWith(3, 3);
    });
});
