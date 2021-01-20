import * as F from 'fp-ts';
import * as M from 'monocle-ts';

interface Movie {
  name: string;
  releaseAt: number;
}

interface Account {
  name: string;
  age: number;
}

interface State {
  account: Account;
  movies: readonly Movie[];
}

export const original: State = {
  movies: [
    {
      name: '1944',
      releaseAt: Date.now(),
    },
    {
      name: '2012',
      releaseAt: Date.now(),
    },
  ],
  account: {
    name: 'jit',
    age: 23,
  },
};

const movieM = M.Lens.fromProp<State>()('movies').composeTraversal(
  M.fromTraversable(F.readonlyArray.Traversable)()
);

export const afterModified = movieM
  .filter(movie => movie.name === '1944')
  .composeLens(M.Lens.fromProp<Movie>()('releaseAt'))
  .set(Date.now() - 100)(original);
