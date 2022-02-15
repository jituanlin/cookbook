/**
 * The following code is a comprehensive example of monocle-ts.
 * For more information, please see [this
 * blog](https://polymona.github.io/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B/2020-08-09-monocle-ts-%E8%A1%A5%E5%85%85%E6%96%87%E6%A1%A3/)
 * */

import * as optics from 'monocle-ts';
import * as fp from 'fp-ts';

export type Movies = Movie[];
export type IDToMovies = Record<string, Movie>;

export interface Movie {
    id: string;
    name: string;
    tags: string[];
    // The format of the "releaseTimeText" field is not uniform, and sometimes it is even difficult to parse.
    releaseTimeText: string;
    rating: fp.option.Option<number>;
}

export const lensName: optics.Lens<Movie, string> =
    optics.Lens.fromProp<Movie>()('name');

export const optionalRating: optics.Optional<Movie, number> =
    optics.Optional.fromOptionProp<Movie>()('rating');

export const isoMovies: optics.Iso<Movies, IDToMovies> = new optics.Iso<Movies,
    IDToMovies>(
    movies =>
        fp.record.fromFoldableMap(
            fp.semigroup.getFirstSemigroup<Movie>(),
            fp.array.array
        )(movies, movie => [movie.id, movie]),
    idToMovies => Object.values(idToMovies)
);

export const traversalTags: optics.Traversal<Movie, string> =
    optics.Lens.fromProp<Movie>()('tags').composeTraversal(
        optics.fromTraversable(fp.array.array)<string>()
    );

export const optionalDate: optics.Optional<Movie, Date> =
    optics.Lens.fromProp<Movie>()('releaseTimeText').composePrism(
        new optics.Prism<string, Date>(
            timeText =>
                fp.option.fromNullable(
                    isNaN(new Date(timeText) as any) ? null : new Date(timeText)
                ),
            date => date.toString()
        )
    );

export const getSecondFavoriteMovie = optics.index.indexArray<Movie>().index(1);

// treat lens as [A]
export const foldName = lensName.asFold();

export const foldTags = optics
    .fromTraversable(fp.array.array)<Movie>()
    .composeLens(optics.Lens.fromProp<Movie>()('tags'))
    .composeTraversal(optics.fromTraversable(fp.array.array)<string>())
    .asFold();
