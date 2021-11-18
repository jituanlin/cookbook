import * as M from 'monocle-ts';
import * as F from 'fp-ts';

type Answer = F.either.Either<string, number>;
export const rightM: M.Prism<
  Answer,
  F.either.Right<number>
> = M.Prism.fromPredicate(F.either.isRight);
