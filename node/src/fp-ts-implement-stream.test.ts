import {exist, stream, take, toArray, unfold} from './fp-ts-implement-stream';
import {pipe} from 'fp-ts/function';
import {none, some} from 'fp-ts/Option';

describe('exist', () => {
    it('should be lazy', function () {
        const evaluated: number[] = [];
        const result = pipe(
            stream(1, 2, -1, 3, 4),
            exist(a => {
                evaluated.push(a);
                return a < 0;
            })
        );
        expect(result).toEqual(true);
        expect(evaluated).toEqual([1, 2, -1]);
    });
});

describe('should take and unfold be lazy', () => {
    const evaluated: number[] = [];

    const stream = unfold(1, n => {
        evaluated.push(n);
        return n < 10 ? some([n, n + 1]) : none;
    });

    const as = pipe(stream, take(3), toArray);

    expect(as).toEqual([1, 2, 3]);
    expect(evaluated).toEqual([1, 2, 3]);
});
