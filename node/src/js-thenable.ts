export interface JsThenable<A> {
  then<B, E>(
    onResolve: (val: A) => B,
    onReject: (e: unknown) => E
  ): JsThenable<B | E>;
}
