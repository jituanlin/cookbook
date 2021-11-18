import * as fp from 'fp-ts';
import {Kind, URIS} from 'fp-ts/lib/HKT';

export class Traversal<S, A> {
  constructor(
    private readonly modifyF: <F extends URIS>(
      F: fp.applicative.Applicative1<F>
    ) => <B>(f: (a: A) => Kind<F, B>) => (s: S) => Kind<F, S>
  ) {}

  modify: <B>(f: (a: A) => B) => (s: S) => S = f =>
    this.modifyF(fp.identity.identity)(f);

  set: (a: A) => (s: S) => S = a => this.modify(() => a);
}

export const traversalArray = <T>(): Traversal<T[], T> =>
  new Traversal<T[], T>(F => f => s => {
    const fbs = s.map(f);
    return fp.array.array.reduce(fbs, F.of([]), (fbs, fb) =>
      F.ap(
        F.map(fb, b => bs => bs.concat(b)),
        fbs
      )
    );
  });
