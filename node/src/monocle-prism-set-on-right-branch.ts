import {string} from 'fp-ts';
import assert from 'assert';
import {prism} from 'monocle-ts';

export const answerPrism: prism.Prism<unknown, string> = prism.fromPredicate(
    string.isString
);

assert.deepStrictEqual(prism.set('')(answerPrism)('1'), '');
assert.deepStrictEqual(prism.set('')(answerPrism)(1), 1);
