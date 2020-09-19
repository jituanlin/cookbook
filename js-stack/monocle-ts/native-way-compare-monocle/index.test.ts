import {Lesson, modifyLessonName1, subjects} from './native-way.index';
import {modifyLessonName2} from './monocle-way.index';

const getNewLessonName = ({id, name}: Lesson) => `${name}(${id})`;

describe('modifyLessonName', () => {
  it('two ways is equal', () => {
    expect(modifyLessonName2(getNewLessonName)(subjects)).toEqual(
      modifyLessonName1(subjects, 'lesson_1', getNewLessonName)
    );
  });
});
