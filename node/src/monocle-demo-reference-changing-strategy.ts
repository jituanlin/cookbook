import * as M from "monocle-ts";
import { readonlyArray } from "fp-ts";
import assert from "assert";

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

const original: State = {
  movies: [
    {
      name: "1944",
      releaseAt: Date.now(),
    },
    {
      name: "2012",
      releaseAt: Date.now(),
    },
  ],
  account: {
    name: "jit",
    age: 23,
  },
};

const movieM = M.Lens.fromProp<State>()("movies").composeTraversal(
  M.fromTraversable(readonlyArray.Traversable)()
);

const modified = movieM
  .filter((movie) => movie.name === "1944")
  .composeLens(M.Lens.fromProp<Movie>()("releaseAt"))
  .set(Date.now() - 100)(original);

assert.notDeepStrictEqual(original, modified);
assert.deepStrictEqual(original.account, modified.account);
assert.deepStrictEqual(original.movies[1], modified.movies[1]);
assert.deepStrictEqual(original.movies[0], modified.movies[0]);
