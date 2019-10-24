import { lens } from "monocle-ts";
import { pipe } from "fp-ts/function";
import assert from "assert";

interface Movie {
  name: string;
}

const nameLens = pipe(lens.id<Movie>(), lens.prop("name"));
assert.deepStrictEqual(nameLens.get({ name: "The Matrix" }), "The Matrix");
