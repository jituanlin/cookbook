import * as fp from 'fp-ts';
import {
  foldName,
  foldTags,
  getSecondFavoriteMovie,
  isoMovies,
  lensName,
  Movie,
  optionalDate,
  optionalRating,
  traversalTags,
} from './kinds-of-optics';

const myFavoriteMovies: Movie[] = [
  {
    id: '0',
    name: '1917',
    tags: ['war'],
    releaseTimeText: '***',
    rating: fp.option.some(16),
  },
  {
    id: '1',
    name: '1944',
    tags: ['history'],
    releaseTimeText: 'Sun Aug 09 2020 22:25:57 GMT+0800 (China Standard Time)',
    rating: fp.option.none,
  },
];

const idToMovie = {
  '0': {
    id: '0',
    name: '1917',
    tags: ['war'],
    releaseTimeText: '1596983047295',
    rating: fp.option.some(16),
  },
  '1': {
    id: '1',
    name: '1944',
    tags: ['history'],
    releaseTimeText: 'Sun Aug 09 2020 22:25:57 GMT+0800 (China Standard Time)',
    rating: fp.option.none,
  },
};

describe('monocle-ts/all-kind-of-optics', () => {
  test('lensName', () => {
    expect(lensName.get(myFavoriteMovies[0])).toBe(myFavoriteMovies[0].name);
    expect(lensName.set('1917(2020)')(myFavoriteMovies[0])).toEqual({
      ...myFavoriteMovies[0],
      name: '1917(2020)',
    });
  });

  test('optionalRating', () => {
    expect(optionalRating.getOption(myFavoriteMovies[1])).toEqual(
      fp.option.none
    );
  });

  test('isoMovies', () => {
    expect(isoMovies.get(myFavoriteMovies)).toEqual(idToMovie);
    expect(isoMovies.reverseGet(idToMovie)).toEqual(myFavoriteMovies);
  });

  test('traversalTags', () => {
    expect(
      traversalTags.modify(tag => `[${tag}]`)(myFavoriteMovies[0])
    ).toEqual({
      ...myFavoriteMovies[0],
      tags: myFavoriteMovies[0].tags.map(tag => `[${tag}]`),
    });
  });

  test('optionalDate', () => {
    expect(optionalDate.getOption(myFavoriteMovies[0])).toEqual(fp.option.none);
    expect(optionalDate.getOption(myFavoriteMovies[1])).toEqual(
      fp.option.some(new Date(myFavoriteMovies[1].releaseTimeText))
    );
  });

  test('getSecondFavoriteMovie', () => {
    expect(getSecondFavoriteMovie.getOption(myFavoriteMovies)).toEqual(
      fp.option.some(myFavoriteMovies[1])
    );
  });

  test('foldName', () => {
    expect(foldName.getAll(myFavoriteMovies[0])).toEqual(['1917']);
  });

  test('(foldTags.exist', () => {
    expect(foldTags.exist(tag => tag === 'history')(myFavoriteMovies)).toBe(
      true
    );
    expect(
      foldTags.exist(tag => tag === 'history')([myFavoriteMovies[0]])
    ).toBe(false);
  });

  test('foldTags.getAll', () => {
    expect(foldTags.getAll(myFavoriteMovies)).toEqual(['war', 'history']);
  });

  test('oldTags.all', () => {
    expect(foldTags.all(str => str !== '')(myFavoriteMovies)).toBe(true);
    expect(foldTags.all(str => str === '')(myFavoriteMovies)).toBe(false);
  });
});
