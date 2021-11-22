import * as F from 'fp-ts3';
import {Title} from './__internal/type';
import {treeTitle} from './__internal/data/tree-title';

interface Article extends Title {
  content: string;
}

const fetchContent = (titleId: number): Promise<string> =>
  Promise.resolve(`content of title[${titleId}]`);

const treeTaskArticle: F.tree.Tree<F.task.Task<Article>> = F.function.pipe(
  treeTitle,
  F.tree.map(title => async () => {
    const content = await fetchContent(title.id);
    return {
      ...title,
      content,
    };
  })
);

export const taskTreeArticle: F.task.Task<F.tree.Tree<Article>> =
  F.tree.sequence(F.task.ApplicativePar)(treeTaskArticle);
