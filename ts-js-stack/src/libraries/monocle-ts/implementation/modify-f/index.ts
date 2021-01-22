import * as M from 'monocle-ts';
import * as F from 'fp-ts';

export const modifyF4Lens = <F extends F.hkt.URIS>(
  functor: F.functor.Functor1<F>
) => <A>(f: (a: A) => F.hkt.Kind<F, A>) => <S>(lens: M.Lens<S, A>) => (
  s: S
): F.hkt.Kind<F, S> => {
  return F.function.pipe(lens.get(s), f, fa =>
    functor.map(fa, (a: A) => lens.set(a)(s))
  );
};
