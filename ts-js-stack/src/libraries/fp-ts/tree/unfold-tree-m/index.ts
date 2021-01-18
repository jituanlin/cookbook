import * as F from 'fp-ts';

interface Title {
  id: number;
  title: string;
}

const fetchTitleDto = async (id: number): Promise<[Title, number[]]> => {
  const title = {id, title: `content of title[id=${id}]`};
  return [title, id < 2 ? [id + 1, id + 2] : []];
};

const fetchTitleDtoTaskify = (
  id: number
): F.taskEither.TaskEither<Error, [Title, number[]]> =>
  F.taskEither.tryCatch(
    () => fetchTitleDto(id),
    (error: Error) => error
  );

export const treeTaskEitherTitle: F.taskEither.TaskEither<
  Error,
  F.tree.Tree<Title>
> = F.tree.unfoldTreeM(F.taskEither.taskEither)(1, fetchTitleDtoTaskify);
