import * as D from "io-ts/lib/Decoder";
import { pipe } from "fp-ts/function";
import assert from "assert";

const genderDecoder = pipe(
  D.union(D.literal("male"), D.literal("female")),
  D.withMessage(() => "gender should be 'male' or 'female'")
);

assert.deepStrictEqual(pipe("unknown", genderDecoder.decode), {
  _tag: "Left",
  left: {
    _tag: "Of",
    value: {
      _tag: "Wrap",
      error: "gender should be 'male' or 'female'",
      errors: {
        _tag: "Concat",
        left: {
          _tag: "Of",
          value: {
            _tag: "Member",
            index: 0,
            errors: {
              _tag: "Of",
              value: { _tag: "Leaf", actual: "unknown", error: '"male"' },
            },
          },
        },
        right: {
          _tag: "Of",
          value: {
            _tag: "Member",
            index: 1,
            errors: {
              _tag: "Of",
              value: {
                _tag: "Leaf",
                actual: "unknown",
                error: '"female"',
              },
            },
          },
        },
      },
    },
  },
});
