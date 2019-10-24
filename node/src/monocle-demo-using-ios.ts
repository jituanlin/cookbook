/**
 * Iso is short for Isomorphism.
 * It represents a transformation between two types without lost any information.
 * */
import assert from "assert";
import { iso } from "monocle-ts";
import { readonlyArray, record, semigroup } from "fp-ts";

interface User {
  id: string;
  name: string;
}

type Users = readonly User[];

// `ID2User` has a different shape than `User` but they are isomorphic.
type ID2User = Record<number, any>;

const userIso: iso.Iso<Users, ID2User> = iso.iso(
  (users) =>
    record.fromFoldableMap(semigroup.first<User>(), readonlyArray.Foldable)(
      users,
      (user) => [user.id, user]
    ),
  (id2user) => Object.values(id2user)
);

assert.deepStrictEqual(
  userIso.get([
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ]),
  {
    1: { id: "1", name: "Alice" },
    2: { id: "2", name: "Bob" },
  }
);
assert.deepStrictEqual(
  userIso.reverseGet({
    1: { id: "1", name: "Alice" },
    2: { id: "2", name: "Bob" },
  }),
  [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ]
);
