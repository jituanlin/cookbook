import {Lesson, modifyLessonName1, subjects} from './monocle-demo-compare';
import {modifyLessonName2} from './monocle-demo';

const getNewLessonName = ({id, name}: Lesson) => `${name}(${id})`;

describe('modifyLessonName', () => {
  it('two ways is equal', () => {
    expect(modifyLessonName2(getNewLessonName)(subjects)).toEqual(
      modifyLessonName1(subjects, 'lesson_1', getNewLessonName)
    );
  });
});
