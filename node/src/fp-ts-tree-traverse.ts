/**
 * Sequence Tree<Task<*>> => Task<Tree<*>>.
 * Useful when fetching additional content of tree.
 * */

import {Task} from 'fp-ts/Task';
import {task, tree} from 'fp-ts';
import {Tree} from 'fp-ts/Tree';
import {pipe} from 'fp-ts/function';

import {Title} from './__internal/type';
import {treeTitle} from './__internal/data/tree-title';

interface Article extends Title {
  content: string;
}

const fetchContent = (titleId: number): Promise<string> =>
  Promise.resolve(`content of title[${titleId}]`);

const treeTaskArticle: Tree<Task<Article>> = pipe(
  treeTitle,
  tree.map(title => async () => {
    const content = await fetchContent(title.id);
    return {
      ...title,
      content,
    };
  })
);

export const taskTreeArticle: Task<Tree<Article>> = tree.sequence(
  task.ApplicativePar
)(treeTaskArticle);
