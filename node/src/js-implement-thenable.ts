export interface thenable<A> {
    then<B, E>(
        onResolve: (val: A) => B,
        onReject: (e: unknown) => E
    ): thenable<B | E>;
}
