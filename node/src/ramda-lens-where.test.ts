import {lensWhere} from './ramda-lens-where';
import * as R from 'ramda';

const arrayTarget = [
  {studentId: 10563001, score: 40},
  {studentId: 10563002, score: 50},
  {studentId: 10563003, score: 60},
];

const objectTarget = {
  10563001: {studentId: 10563001, score: 40},
  10563002: {studentId: 10563002, score: 50},
  10563003: {studentId: 10563003, score: 60},
};

const lens = lensWhere(R.propEq('studentId', 10563001));

describe('lens-where', () => {
  test('array: view with lensWhere should return index/value pair of  ', () => {
    expect(R.view(lens, arrayTarget)).toEqual({studentId: 10563001, score: 40});
  });

  test('record: view with lensWhere should return index/value pair ', () => {
    expect(R.view(lens, objectTarget)).toEqual({
      studentId: 10563001,
      score: 40,
    });
  });

  test('array: set with lensWhere basic functionality', () => {
    expect(R.set(lens, {studentId: 10563001, score: 150}, arrayTarget)).toEqual(
      [
        {studentId: 10563001, score: 150},
        {studentId: 10563002, score: 50},
        {studentId: 10563003, score: 60},
      ]
    );
  });

  test('record: set with lensWhere basic functionality', () => {
    expect(
      R.set(lens, {studentId: 10563001, score: 150}, objectTarget)
    ).toEqual({
      10563001: {studentId: 10563001, score: 150},
      10563002: {studentId: 10563002, score: 50},
      10563003: {studentId: 10563003, score: 60},
    });
  });

  test('array: over with lensWhere basic functionality', () => {
    expect(R.over(lens, R.set(R.lensProp('score'), 150), arrayTarget)).toEqual([
      {studentId: 10563001, score: 150},
      {studentId: 10563002, score: 50},
      {studentId: 10563003, score: 60},
    ]);
  });

  test('record: over with lensWhere basic functionality', () => {
    expect(R.over(lens, R.set(R.lensProp('score'), 150), objectTarget)).toEqual(
      {
        10563001: {studentId: 10563001, score: 150},
        10563002: {studentId: 10563002, score: 50},
        10563003: {studentId: 10563003, score: 60},
      }
    );
  });
});
