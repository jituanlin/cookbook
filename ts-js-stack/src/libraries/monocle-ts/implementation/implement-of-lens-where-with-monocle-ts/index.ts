/**
 * The following code is a implementation of [lensWhere](https://github.com/jituanlin/cookbook/blob/master/js-stack/fp/lens-where/index.ts)
 * with monocle-ts.
 * */

import * as optics from 'monocle-ts';
import * as fp from 'fp-ts';
import {Kind, URIS} from 'fp-ts/lib/HKT';

interface Student {
  studentId: number;
  score: number;
}

type TraversalScore = <URI extends URIS>(
  traversable: fp.traversable.Traversable1<URI>
) => (studentId: number) => optics.Traversal<Kind<URI, Student>, number>;

export const TraversalScore: TraversalScore = traversable => studentId =>
  optics
    .fromTraversable(traversable)<Student>()
    .filter(student => student.studentId === studentId)
    .composeLens(optics.Lens.fromProp<Student>()('score'));

type GetOptionScore = <URI extends URIS>(
  traversable: fp.traversable.Traversable1<URI>
) => (studentId: number) => (s: Kind<URI, Student>) => fp.option.Option<number>;

export const getOptionScore: GetOptionScore = traversable => id => {
  const fold = TraversalScore(traversable)(id).asFold();
  return fold.headOption.bind(fold) as typeof fold.headOption;
};
