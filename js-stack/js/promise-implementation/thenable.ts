export interface Thenable<A> {
  then<B, E>(
    onResolve: (val: A) => B,
    onReject: (e: unknown) => E
  ): Thenable<B | E>;
}
