/**
 * Following code is a implementation of [lensWhere](https://github.com/jituanlin/cookbook/blob/master/js-stack/fp/lens-where/index.ts)
 * with monocle-ts.
 * */

import * as optics from 'monocle-ts';
import * as fp from 'fp-ts';

interface Student {
  studentId: number;
  score: number;
}

export const TraversalScore = (
  traversable: fp.traversable.Traversable1<'Record' | 'Array'>
) => (studentId: number) =>
  optics
    .fromTraversable(traversable)<Student>()
    .filter(student => student.studentId === studentId)
    .composeLens(optics.Lens.fromProp<Student>()('score'));

export const getOptionScore = (
  traversable: fp.traversable.Traversable1<'Record' | 'Array'>
) => (studentId: number) => {
  const fold = TraversalScore(traversable)(studentId).asFold();
  return fold.headOption.bind(fold) as typeof fold.headOption;
};
