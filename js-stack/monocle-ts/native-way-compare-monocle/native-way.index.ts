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

export const modifyLessonName1 = (
  subjects: Subject[],
  id: string,
  getNewName: (lesson: Lesson) => string
) => {
  return subjects.map(subject => {
    const lessonMatcher = (lesson: Lesson) => lesson.id === id;
    const levelMatcher = (level: Level) => level.lessons.some(lessonMatcher);
    const subjectMatcher = (subject: Subject) =>
      subject.levels.some(levelMatcher);

    /**
     * 这段代码维护性较差, 因为需要手动复制不需要关注到的数据片段
     * 如在modifyLessonName函数中, 我们只是需要对lesson.name进行
     * 修改, 但却需要对其他没有修改到的数据片段进行复制
     * 这种层层嵌套的复制操作的逻辑复杂度与操作的数据结构的嵌套层次成正比
     * */
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
                    name: getNewName(lesson),
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
