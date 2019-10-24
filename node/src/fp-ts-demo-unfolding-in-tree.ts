/**
 * Following code show a demo of constructing a tree from a list of values.
 * See [Corecursion](https://en.wikipedia.org/wiki/Corecursion) for more details.
 * */
import assert from "assert";
import { array, tree } from "fp-ts";
import { pipe } from "fp-ts/function";

type HeaderID = number;

interface Header {
  id: HeaderID;
  parentId: number | null;
  title: string;
}

const headers: Header[] = [
  {
    id: 1,
    title: "level1",
    parentId: null,
  },
  {
    id: 2,
    title: "level2-1",
    parentId: 1,
  },
];

const getTitleAndItsChildrenIDs = (id: HeaderID): [Header, HeaderID[]] => {
  const title = headers.find((header) => header.id === id, headers)!;
  const childrenIDs = pipe(
    headers,
    array.filter((title) => title.parentId === id),
    array.map((title) => title.id)
  );
  return [title, childrenIDs];
};

assert.deepStrictEqual(tree.unfoldTree(1, getTitleAndItsChildrenIDs), {
  value: { id: 1, title: "level1", parentId: null },
  forest: [
    {
      value: { id: 2, title: "level2-1", parentId: 1 },
      forest: [],
    },
  ],
});
