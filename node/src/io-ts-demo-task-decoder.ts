/**
 * Following code show how to use the` TaskDecoder` to validate is username duplicated.
 * */
import * as DE from "io-ts/DecodeError";
import * as FS from "io-ts/FreeSemigroup";
import * as TD from "io-ts/TaskDecoder";
import { taskEither } from "fp-ts";

const decoder: TD.TaskDecoder<unknown, string> = {
  decode: (username: string) =>
    taskEither.tryCatch(
      async () => {
        await checkIsUsernameExist(username);
        return username;
      },
      (e: Error) => FS.of(DE.leaf<string>(JSON.stringify(username), e.message))
    ),
};

it("_", async () => {
  expect(await decoder.decode("*")()).toEqual({
    _tag: "Left",
    left: {
      _tag: "Of",
      value: {
        _tag: "Leaf",
        actual: '"*"',
        error: "username * is exist",
      },
    },
  });
});

// Mock the checking username API
async function checkIsUsernameExist(username: string): Promise<boolean> {
  const matchedPassword = "*";
  if (matchedPassword === username) {
    throw new Error(`username ${username} is exist`);
  } else {
    return true;
  }
}
