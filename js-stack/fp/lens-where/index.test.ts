import * as R from 'ramda';
import lensWhere, {overValue} from './lensWhere';
import * as assert from 'assert';

const arrayTarget = [
  {studentId: 10563001, score: 40},
  {studentId: 10563002, score: 50},
  {studentId: 10563002, score: 60},
];

const objectTarget = {
  10563001: {studentId: 10563001, score: 40},
  10563002: {studentId: 10563002, score: 50},
  10563003: {studentId: 10563002, score: 60},
};

const lens = lensWhere(R.propEq('studentId', 10563001));

assert.deepStrictEqual(
  [0, {studentId: 10563001, score: 40}],
  R.view(lens, arrayTarget)
);

assert.deepStrictEqual(
  [
    {studentId: 10563001, score: 40},
    {studentId: 10563002, score: 150},
    {studentId: 10563002, score: 60},
  ],
  R.set(lens, [1, {studentId: 10563002, score: 150}], arrayTarget)
);

assert.deepStrictEqual(
  [
    {studentId: 10563001, score: 50},
    {studentId: 10563002, score: 50},
    {studentId: 10563002, score: 60},
  ],
  R.over(
    lens,
    maybeIndexAndValuePair => {
      if (R.isNil(maybeIndexAndValuePair)) {
        return undefined;
      }
      return [
        maybeIndexAndValuePair[0],
        {
          ...maybeIndexAndValuePair[1],
          score: maybeIndexAndValuePair[1].score + 10,
        },
      ];
    },
    arrayTarget
  )
);

assert.deepStrictEqual(
  [
    {studentId: 10563001, score: 50},
    {studentId: 10563002, score: 50},
    {studentId: 10563002, score: 60},
  ],

  R.over(lens, overValue(R.over(R.lensProp('score'), R.add(10))), arrayTarget)
);

assert.deepStrictEqual(
  ['10563001', {studentId: 10563001, score: 40}],
  R.view(lens, objectTarget)
);
assert.deepStrictEqual(
  {
    '10563001': {studentId: 10563001, score: 40},
    '10563002': {studentId: 10563002, score: 150},
    '10563003': {studentId: 10563002, score: 60},
  },
  R.set(lens, [10563002, {studentId: 10563002, score: 150}], objectTarget)
);

assert.deepStrictEqual(
  {
    '10563001': {studentId: 10563001, score: 50},
    '10563002': {studentId: 10563002, score: 50},
    '10563003': {studentId: 10563002, score: 60},
  },
  R.over(lens, overValue(R.over(R.lensProp('score'), R.add(10))), objectTarget)
);
