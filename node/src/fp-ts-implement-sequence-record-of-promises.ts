/**
 * The following code is `sequenceRecordOfPromises` implemented using `fp-ts`.
 * It is also a showcase of using fp-ts 's HKT.
 * */
import { apply } from "fp-ts";

/**
 * The following code declare `Promise` as a member of fp-ts 's kind.
 * Under the hood:
 * 1. Relative declaration:
 *    - `type Kind<URI extends URIS, A> = URI extends URIS ? URItoKind<A>[URI] : any;`
 *    - `type URIS = keyof URItoKind<any>;`
 *     - `interface URItoKind<A> {};`
 * 2. When declare an ambient declarations, the `Promise` attribute will be merged into the URItoKind interface of
 * fp-ts.
 * 3. Then `Kind<PromiseURI,A>` will be inferred as `URItoKind<A>['PromiseURI'] => Promise<A>`.
 * */
const URI = "Promise";
type URI = typeof URI;
declare module "fp-ts" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace hkt {
    interface URItoKind<A> {
      readonly [URI]: Promise<A>;
    }
  }
}

const apply4promise: apply.Apply1<URI> = {
  ap: (fab, fa) => fab.then((f) => fa.then((a) => f(a))),
  map: (fa, f) => fa.then(f),
  URI: URI,
};

const sequenceRecordOfPromises = <NER extends Record<string, Promise<any>>>(
  recordOfPromises: EnforceNonEmptyRecord<NER>
) => apply.sequenceS(apply4promise)(recordOfPromises);

it("should return Promise of record", async () => {
  expect(
    await sequenceRecordOfPromises({
      a: Promise.resolve(1),
      b: Promise.resolve(2),
    })
  ).toEqual({ a: 1, b: 2 });
});

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;
