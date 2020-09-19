import * as optics from 'monocle-ts';
import * as fp from 'fp-ts';
import {Lesson, Level, Subject} from './native-way.index';

const Lesson = (id: string) =>
  optics
    .fromTraversable(fp.array.array)<Subject>()
    .composeLens(optics.Lens.fromProp<Subject>()('levels'))
    .composeTraversal(optics.fromTraversable(fp.array.array)<Level>())
    .composeLens(optics.Lens.fromProp<Level>()('lessons'))
    .composeTraversal(optics.fromTraversable(fp.array.array)<Lesson>())
    .filter(lesson => lesson.id === id);

const LessonName = optics.Lens.fromProp<Lesson>()('name');

export const modifyLessonName2 = (getLessonName: (lesson: Lesson) => string) =>
  Lesson('lesson_1').modify(lesson =>
    LessonName.set(getLessonName(lesson))(lesson)
  );
