import * as TD from 'io-ts/taskDecoder';
import * as F from 'fp-ts';
import * as FS from 'io-ts/FreeSemigroup';
import * as DE from 'io-ts/DecodeError';

const getPassword = async () => '****';

const decoder: TD.TaskDecoder<unknown, string> = {
  decode: pw =>
    F.taskEither.tryCatch(
      async () => {
        const matchedPw = await getPassword();
        if (matchedPw === pw) {
          return pw;
        } else {
          throw new Error(matchedPw);
        }
      },
      (e: Error) => FS.of(DE.leaf<string>(JSON.stringify(pw), e.message))
    ),
};

F.pipeable.pipe(
  '*',
  decoder.decode,
  F.taskEither.mapLeft(e => {
    console.log(TD.draw(e));
  })
)();
