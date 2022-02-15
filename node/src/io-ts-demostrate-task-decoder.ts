import * as TD from 'io-ts/TaskDecoder';
import * as F from 'fp-ts';
import {taskEither} from 'fp-ts';
import * as FS from 'io-ts/FreeSemigroup';
import * as DE from 'io-ts/DecodeError';
import {pipe} from 'fp-ts/function';

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

pipe(
    '*',
    decoder.decode,
    taskEither.mapLeft(e => {
        console.log(TD.draw(e));
    })
)();
