/**
 * Following code show a pattern to map Tree<A> to Tree<Task<A>> and finally to Task<Tree<A>>.
 * This example simulates the process of fetching the content of the article:
 * 1. Assume there is a tree of headers.
 * 2. Need to fetch content of each header and compose them into a tree.
 * */
import { Task } from "fp-ts/Task";
import { Tree } from "fp-ts/Tree";
import { pipe } from "fp-ts/function";
import { task, tree } from "fp-ts";

interface Header {
  id: number;
  parentId: number | null;
  title: string;
}

interface Section {
  header: Header;
  content: string;
}

const headerTree: tree.Tree<Header> = {
  value: { id: 1, title: "level1", parentId: null },
  forest: [{ value: { id: 3, title: "level2-2", parentId: 1 }, forest: [] }],
};

const sectionTree: Task<Tree<Section>> = pipe(
  headerTree,
  tree.map(fetchSection),
  tree.sequence(task.ApplicativePar)
);

it("_", async () => {
  expect(await sectionTree()).toEqual({
    value: {
      header: { id: 1, title: "level1", parentId: null },
      content: "content of title[1]",
    },
    forest: [
      {
        value: {
          header: { id: 3, title: "level2-2", parentId: 1 },
          content: "content of title[3]",
        },
        forest: [],
      },
    ],
  });
});

// Mock the fetching section API
function fetchSection(header: Header): Task<Section> {
  return () =>
    Promise.resolve({
      header,
      content: `content of title[${header.id}]`,
    });
}
