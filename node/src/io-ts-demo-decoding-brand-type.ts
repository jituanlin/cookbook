import * as D from "io-ts/decoder";
import assert from "assert";
import { pipe } from "fp-ts/function";

interface AgeBrand {
  readonly Age: unique symbol;
}

type Age = number & AgeBrand;
const ageDecoder = pipe(
  D.number,
  D.refine((input): input is Age => input > 0 && input < 130, "Age"),
  D.withMessage(() => "age must in range(0,130)")
);

assert.deepStrictEqual(pipe(140, ageDecoder.decode), {
  _tag: "Left",
  left: {
    _tag: "Of",
    value: {
      _tag: "Wrap",
      error: "age must in range(0,130)",
      errors: {
        _tag: "Of",
        value: { _tag: "Leaf", actual: 140, error: "Age" },
      },
    },
  },
});
