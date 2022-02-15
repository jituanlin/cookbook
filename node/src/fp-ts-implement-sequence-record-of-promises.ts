/**
 * The following code is `sequenceRecordOfPromises` implemented using `fp-ts`.
 * It is also a show case of using fp-ts 's HKT.
 * */
import * as fp from 'fp-ts';
import * as assert from "assert";

type UnpackIfPromise<T> = T extends Promise<infer A> ? A : T;

type SequenceRecordOfPromises = <T extends Record<any, Promise<any> | any>>(
    objectOfPromise: T
) => Promise<{ [K in keyof T]: UnpackIfPromise<T[K]> }>;

/**
 * The following code declare `Promise` as a member of fp-ts 's kind.
 * Under the hook:
 *  1. relative declare:
 *      export type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any;
 *      export type URIS = keyof URItoKind<any>;
 *      export interface URItoKind<A> {};
 *  2. when declare ambient declarations, the `Promise` attribute will be merged into the URItoKind interface of fp-ts.
 *  3. Then Kind<PromiseURI,A> will be inferred as URItoKind<A>['PromiseURI'] => Promise<A>.
 * */
const promiseURI = 'Promise';
type PromiseURI = typeof promiseURI;
declare module 'fp-ts' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace hkt {
        export interface URItoKind<A> {
            readonly [promiseURI]: Promise<A>;
        }
    }
}

const applyPromise: fp.apply.Apply1<PromiseURI> = {
    ap: (fab, fa) => fab.then(f => fa.then(a => f(a))),
    map: (fa, f) => fa.then(f),
    URI: promiseURI,
};

export const sequenceRecordOfPromises: SequenceRecordOfPromises =
    recordOfPromises =>
        fp.apply.sequenceS(applyPromise)(recordOfPromises as any) as any;

assert.deepStrictEqual(
    await sequenceRecordOfPromises({
        a: Promise.resolve(1),
        b: Promise.resolve(2),
    }),
    {
        a: 1,
        b: 2,
    }
);
