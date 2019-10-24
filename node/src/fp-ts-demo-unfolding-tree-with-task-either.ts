/**
 * See ./fp-ts-demo-unfolding-tree-with-option-monad.ts.
 * */
import { either, taskEither, tree } from "fp-ts";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { Tree } from "fp-ts/lib/Tree";
import assert from "assert";

type TitleID = number;

interface Title {
  id: TitleID;
  content: string;
}

const fetchTitleDto = async (id: number): Promise<[Title, TitleID[]]> => {
  const title: Title = { id, content: `content of title[id=${id}]` };
  return [title, id < 2 ? [id + 1, id + 2] : []];
};

const getTitleAndItsChildrenIDs = (
  id: number
): TaskEither<Error, [Title, number[]]> =>
  taskEither.tryCatch(
    () => fetchTitleDto(id),
    (error: Error) => error
  );

const titleTree: TaskEither<Error, Tree<Title>> = tree.unfoldTreeM(
  taskEither.Monad
)(1, getTitleAndItsChildrenIDs);

it("_", async () => {
  assert.deepStrictEqual(
    await titleTree(),
    either.right({
      value: { id: 1, title: "content of title[id=1]" },
      forest: [
        { value: { id: 2, title: "content of title[id=2]" }, forest: [] },
        { value: { id: 3, title: "content of title[id=3]" }, forest: [] },
      ],
    })
  );
});
