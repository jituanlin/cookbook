import {getOptionScore, TraversalScore} from './index';
import * as fp from 'fp-ts';

const arrayTarget = [
  {studentId: 10563001, score: 40},
  {studentId: 10563002, score: 50},
  {studentId: 10563003, score: 60},
];

const arrayTargetV2 = [
  {studentId: 10563001, score: 40},
  {studentId: 10563002, score: 150},
  {studentId: 10563003, score: 60},
];

const objectTarget = {
  10563001: {studentId: 10563001, score: 40},
  10563002: {studentId: 10563002, score: 50},
  10563003: {studentId: 10563003, score: 60},
};

const objectTargetV2 = {
  10563001: {studentId: 10563001, score: 40},
  10563002: {studentId: 10563002, score: 150},
  10563003: {studentId: 10563003, score: 60},
};

describe('monocle-ts/implement-of-lens-where-with-monocle-ts', () => {
  test('TraversalScore', () => {
    expect(
      TraversalScore(fp.array.array)(10563002).set(150)(arrayTarget)
    ).toEqual(arrayTargetV2);

    expect(
      TraversalScore(fp.record.record)(10563002).set(150)(objectTarget)
    ).toEqual(objectTargetV2);
  });

  test('getOptionScore', () => {
    expect(getOptionScore(fp.array.array)(10563002)(arrayTarget)).toEqual(
      fp.option.some(arrayTarget[1].score)
    );
  });
});
