import {treeTheseTitle} from './unfold-for-these';

describe('unfold for these', () => {
  it('should not fatal error', function () {
    expect(treeTheseTitle).toEqual({
      _tag: 'Both',
      left: ['cannot get child title of [id]=2'],
      right: {
        forest: [
          {
            forest: [],
            value: {
              id: 2,
              title: 'content of title[id=2]',
            },
          },
          {
            forest: [],
            value: {
              id: 3,
              title: 'content of title[id=3]',
            },
          },
        ],
        value: {
          id: 1,
          title: 'content of title[id=1]',
        },
      },
    });
  });
});
