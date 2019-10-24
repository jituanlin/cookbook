/**
 * Implement `Stream` in typescript.
 * @see: https://www.oreilly.com/library/view/functional-programming-in/9781617290657/
 * */
import { fold, none, Option, some } from "fp-ts/Option";
import { pipe } from "fp-ts/function";

interface Cons<A> {
  head: () => A;
  tail: () => Stream<A>;
  readonly _tag: "Cons";
}

interface Empty<A> {
  readonly _tag: "Empty";
}

type Stream<A> = Cons<A> | Empty<A>;

const cons = <A>(head: () => A, tail: () => Stream<A>): Cons<A> => ({
  head,
  tail,
  _tag: "Cons",
});

const empty: Empty<unknown> = {
  _tag: "Empty",
};

const foldRight =
  <A, B>(z: B, f: (a: A, b: () => B) => B) =>
  (s: Stream<A>): B => {
    switch (s._tag) {
      case "Cons":
        return f(s.head(), () => foldRight(z, f)(s.tail()));
      case "Empty":
        return z;
    }
  };

const exist =
  <A>(p: (a: A) => boolean) =>
  (s: Stream<A>): boolean =>
    pipe(
      s,
      foldRight(false as boolean, (a, b) => p(a) || b())
    );

const stream = <A>(...as: ReadonlyArray<A>): Stream<A> => {
  if (as.length === 0) {
    return empty;
  }
  const [head, ...tails] = as;
  return cons(
    () => head,
    () => stream(...tails)
  );
};

const unfold = <A, S>(z: S, f: (z: S) => Option<[A, S]>): Stream<A> =>
  pipe(
    f(z),
    fold(
      () => empty as Stream<A>,
      ([a, z1]) =>
        cons(
          () => a,
          () => unfold(z1, f)
        )
    )
  );

const take =
  (n: number) =>
  <A>(s: Stream<A>): Stream<A> => {
    switch (s._tag) {
      case "Empty":
        return s;
      case "Cons":
        if (n == 1) {
          return cons(s.head, () => empty as Empty<A>);
        } else {
          return cons(s.head, () => take(n - 1)(s.tail()));
        }
    }
  };

const toArray = <A>(s: Stream<A>): ReadonlyArray<A> => {
  switch (s._tag) {
    case "Empty":
      return [];
    case "Cons":
      return [s.head(), ...toArray(s.tail())];
  }
};

describe("exist", () => {
  it("should be lazy", function () {
    const evaluated: number[] = [];
    const result = pipe(
      stream(1, 2, -1, 3, 4),
      exist((a) => {
        evaluated.push(a);
        return a < 0;
      })
    );
    expect(result).toEqual(true);
    expect(evaluated).toEqual([1, 2, -1]);
  });
});

describe("should take and unfold be lazy", () => {
  const evaluated: number[] = [];

  const stream = unfold(1, (n) => {
    evaluated.push(n);
    return n < 10 ? some([n, n + 1]) : none;
  });

  const as = pipe(stream, take(3), toArray);

  expect(as).toEqual([1, 2, 3]);
  expect(evaluated).toEqual([1, 2, 3]);
});
