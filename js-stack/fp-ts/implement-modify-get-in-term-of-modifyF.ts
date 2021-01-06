import * as F from 'fp-ts3';

abstract class Lens<S, A> {
  abstract modifyF: <F extends F.hkt.URIS2, E>(
    F: F.functor.Functor2C<F, E>
  ) => (s: S) => (f: (a: A) => F.hkt.Kind2<F, E, A>) => F.hkt.Kind2<F, E, S>;

  get = (s: S): A => {
    return this.modifyF<'Const', A>(F.const.Functor)(s)(a => F.const.make(a));
  };
}

class LensN extends Lens<{n: number}, number> {
  modifyF = <F extends F.hkt.URIS2, E>(F: F.functor.Functor2C<F, E>) => (s: {
    n: number;
  }) => (f: (a: number) => F.hkt.Kind2<F, E, number>) =>
    F.map((a: number) => ({n: a}))(f(s.n));
}

const lenN = new LensN();

// log:
console.log(lenN.get({n: 42}));
