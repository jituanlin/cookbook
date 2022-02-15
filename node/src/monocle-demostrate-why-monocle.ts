import {readonlyArray} from 'fp-ts';
import {lens, traversal} from 'monocle-ts';
import {pipe} from 'fp-ts/function';
import assert from 'assert';

export interface Lesson {
    id: string;
    name: string;
    startTimeText: string;
}

export interface Level {
    id: string;
    name: string;
    lessons: Lesson[];
}

export interface Subject {
    id: string;
    name: string;
    levels: Level[];
}

export const subjects: Subject[] = [
    {
        id: 'subject_1',
        name: 'math',
        levels: [
            {
                id: 'level_1',
                name: 'hard',
                lessons: [
                    {
                        id: 'lesson_1',
                        name: 'introduction',
                        startTimeText: '2020-09-19T10:51:55.291Z',
                    },
                ],
            },
        ],
    },
];

/**
 * Without monocle, we have to manually copy prices of data, which makes code hard to maintain
 * */
export const modifyLessonName1 = (
    subjects: Subject[],
    id: string,
    newLessonName: string
) => {
    return subjects.map(subject => {
        const lessonMatcher = (lesson: Lesson) => lesson.id === id;
        const levelMatcher = (level: Level) => level.lessons.some(lessonMatcher);
        const subjectMatcher = (subject: Subject) =>
            subject.levels.some(levelMatcher);

        if (subjectMatcher(subject)) {
            return {
                ...subject,
                levels: subject.levels.map(level => {
                    if (levelMatcher(level)) {
                        return {
                            ...level,
                            lessons: level.lessons.map(lesson => {
                                if (lessonMatcher(lesson)) {
                                    return {
                                        ...lesson,
                                        name: newLessonName,
                                    };
                                }
                                return lesson;
                            }),
                        };
                    }
                    return level;
                }),
            };
        }
        return subject;
    });
};

// with monocle
const getLessonTraversal = (id: string) =>
    pipe(
        traversal.fromTraversable(readonlyArray.Traversable)<Subject>(),
        traversal.composeLens(pipe(lens.id<Subject>(), lens.prop('levels'))),
        traversal.composeTraversal(
            traversal.fromTraversable(readonlyArray.Traversable)<Level>()
        ),
        traversal.composeLens(pipe(lens.id<Level>(), lens.prop('lessons'))),
        traversal.composeTraversal(
            traversal.fromTraversable(readonlyArray.Traversable)<Lesson>()
        ),
        traversal.filter(lesson => lesson.id === id),
        traversal.composeLens(pipe(lens.id<Lesson>(), lens.prop('name')))
    );

assert.deepStrictEqual(
    modifyLessonName1(subjects, 'lesson_1', 'lesson_1_name'),
    traversal.set('lesson_1_name')(getLessonTraversal('lesson_1'))(subjects)
);
