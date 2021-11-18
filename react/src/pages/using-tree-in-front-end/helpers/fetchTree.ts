import {Section, Title, TreeTitle} from '../types';
import {Tree} from 'fp-ts/Tree';
import {pipe} from 'fp-ts/pipeable';
import {either, taskEither, tree} from 'fp-ts';
import {tryCatch} from 'fp-ts3/TaskEither';
import {fetchContent} from '../apis';
import {identity} from 'fp-ts/function';

export const fetchTreeSection = async (
  treeTitle: TreeTitle
): Promise<Tree<Section>> => {
  const taskEitherTree = pipe(
    treeTitle,
    tree.map((title: Title) =>
      tryCatch(async () => ({
        ...title,
        content: await fetchContent(title.id),
        isSelected: false,
      }))
    ),
    tree.sequence(taskEither.taskEither)
  );

  return pipe(
    await taskEitherTree(),
    either.fold(error => {
      throw error;
    }, identity)
  );
};
