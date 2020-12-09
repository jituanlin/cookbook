import * as fp from 'fp-ts';

interface Title {
  id: number;
  content: string;
}

const fetchTitleDto = async (id: number): Promise<[Title, number[]]> => {
  const title = {id, content: `content of title[id=${id}]`};
  return [title, id < 5 ? [id + 1, id + 2] : []];
};

const fetchTitleDtoTaskify = (id: number) =>
  fp.taskEither.tryCatch(
    () => fetchTitleDto(id),
    (error: Error) => error
  );

const titleShow = fp.show.getStructShow({
  id: fp.show.showNumber,
  content: fp.show.showString,
});

const task = fp.pipeable.pipe(
  fp.tree.unfoldForestM(fp.taskEither.taskEither)([1], fetchTitleDtoTaskify),
  fp.taskEither.map(fp.array.map(fp.tree.map(titleShow.show))),
  fp.taskEither.map(fp.tree.drawForest)
);

task().then((e: any) => console.log(e.right));
